<script lang="ts">
    import Layout from '$site/components/examples/Layout.svelte'
    let { children } = $props()
    const nav = [
        {
            title: `Hello World`,
            page: 'hello-world',
            description: `The default datatable without customization`,
            tag: ['basic', 'row per page', 'row count', 'search', 'filter', 'default']
        },
        {
            title: `shadcn-ui "Tasks"`,
            page: 'shadcn',
            description: `A copy of shadcn-ui's datatable powered by SSD`,
            tag: ['advanced', 'shadcn', 'column visibility', 'advanced filter', 'multiple criteria filter', 'row selection', 'distinct values']
        },
        {
            title: `Users administration`,
            page: 'crud',
            description: `Reactivity example with a simple CRUD`,
            tag: ['data update', 'sticky header', 'basic', 'setRows', 'scroll y', 'store']
        },
        {
            title: `Recursive filters`,
            page: 'nested-array',
            description: `Search and filters also apply recursively to nested arrays`,
            tag: ['filters', 'search', 'nested', 'props', 'recursive']
        },
        {
            title: `Tree view`,
            page: 'tree',
            description: `Search on a deep tree with highlighting`,
            tag: ['tree', 'folder', 'file', 'recursive', 'nested']
        },
        {
            title: `Pokedex`,
            page: 'pokedex',
            description: `Multiple criteria filter`,
            tag: ['calculation', 'aggregate', 'distinct values', 'pokemon', 'filter', 'criteria', 'multiple']
        },
        {
            title: `Cars per make`,
            page: 'distinct',
            description: `Calculate distinct values and their counts`,
            tag: ['calculation', 'aggregate', 'distinct values', 'car', 'make']
        },
    ]
</script>


<Layout {nav}>
    {@render children()}
</Layout>
