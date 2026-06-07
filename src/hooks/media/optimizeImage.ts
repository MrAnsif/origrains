import type { CollectionBeforeOperationHook } from 'payload'
import sharp from 'sharp'

const SKIP_MIMETYPES = new Set(['image/gif'])
const OPTIMIZE_MIMETYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/tiff', 'image/webp'])

const WEBP_QUALITY = 89
const MAX_DIMENSION = 2048

/**
 * Payload beforeOperation hook for the Media collection.
 *
 * Intercepts the raw uploaded file buffer before Payload (and the S3 storage adapter)
 * processes it. For supported image types it will:
 *  - Strip all EXIF metadata (privacy + size reduction)
 *  - Auto-orient based on EXIF rotation data
 *  - Resize down if the longest edge exceeds MAX_DIMENSION (preserves aspect ratio, no upscaling)
 *  - Convert to WebP at WEBP_QUALITY
 *
 * GIFs are skipped to preserve animation.
 * The optimized buffer replaces req.file in-place so Payload and S3 see the clean file.
 */
export const optimizeImage: CollectionBeforeOperationHook = async ({ args, operation }) => {
  if (operation !== 'create' && operation !== 'update') return args
  if (!args.req?.file) return args

  const file = args.req.file
  const mimetype = file.mimetype?.toLowerCase() ?? ''

  // Skip non-image or explicitly excluded types (e.g. GIF)
  if (SKIP_MIMETYPES.has(mimetype)) return args
  if (!OPTIMIZE_MIMETYPES.has(mimetype)) return args

  try {
    const inputBuffer = Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data)

    const pipeline = sharp(inputBuffer)
      .rotate() // Auto-orient using EXIF, then strip EXIF
      .withMetadata({ exif: {} }) // Strip all EXIF but keep colorspace/orientation
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',      // Shrink to fit within the box, preserving aspect ratio
        withoutEnlargement: true, // Never upscale
      })
      .webp({ quality: WEBP_QUALITY })

    const optimizedBuffer = await pipeline.toBuffer()

    // Derive the new filename with .webp extension
    const originalName = file.name ?? 'image'
    const baseName = originalName.replace(/\.[^.]+$/, '')
    const newName = `${baseName}.webp`

    // Replace the file in-place
    args.req.file = {
      ...file,
      data: optimizedBuffer,
      mimetype: 'image/webp',
      name: newName,
      size: optimizedBuffer.byteLength,
    }
  } catch (err) {
    // Log and continue — let Payload store the original if optimization fails
    args.req.payload.logger.error({
      msg: '[optimizeImage] Failed to optimize image, uploading original',
      err,
    })
  }

  return args
}
