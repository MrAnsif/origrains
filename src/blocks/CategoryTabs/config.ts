import type { Block } from 'payload'

export const CategoryTabsBlock: Block = {
  slug: 'categoryTabs',
  interfaceName: 'CategoryTabsBlock',
  labels: {
    singular: 'Category Tabs',
    plural: 'Category Tabs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      admin: {
        description: 'Optional heading displayed above the category tabs',
      },
    },
  ],
}
