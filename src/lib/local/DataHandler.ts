import Context          from './Context'
import SortHandler      from './handlers/SortHandler'
import SelectHandler    from './handlers/SelectHandler'
import PageHandler      from './handlers/PageHandler'
import SearchHandler    from './handlers/SearchHandler'
import FilterHandler    from './handlers/FilterHandler'

import type { Readable, Writable } from 'svelte/store'
import type { Internationalization, Row, Comparator, FilterBy, Selectable, OrderBy } from '$lib/local'

export type Params = { rowsPerPage?: number, i18n?: Internationalization }

export default class DataHandler<T extends Row = any>
{
    private context         : Context<T>
    private sortHandler     : SortHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>
    private filterHandler   : FilterHandler<T>
    public i18n             : Internationalization

    constructor(data: T[] = [], params: Params = { rowsPerPage: null })
    {
        this.i18n           = this.translate(params.i18n)
        this.context        = new Context(data, params)
        this.sortHandler    = new SortHandler(this.context)
        this.selectHandler  = new SelectHandler(this.context)
        this.pageHandler    = new PageHandler(this.context)
        this.searchHandler  = new SearchHandler(this.context)
        this.filterHandler  = new FilterHandler(this.context)
    }

    public setRows(data: T[])
    {
        this.context.rawRows.set(data)
        this.applySorting()
    }

    public getRows(): Readable<T[]>
    {
        return this.context.rows
    }

    public getRowsAcrossPages(): Readable<T[]>
    {
        return this.context.filteredRows
    }

    public select(value: Selectable<T>)
    {
        this.selectHandler.select(value)
    }

    public getSelected()
    {
        return this.context.selected
    }

    public selectAll(params: { selectBy?: keyof T; scope?: 'all' | 'currentPage' } = {}): void
    {
        this.context.selectScope.set(params.scope ?? 'all')
        this.selectHandler.selectAll(params.selectBy ?? null)
    }

    public isAllSelected(): Readable<boolean>
    {
        return this.context.isAllSelected
    }

    public getRowCount(): Readable<{ total: number, start: number, end: number }>
    {
        return this.context.rowCount
    }

    public getRowsPerPage(): Writable<number | null>
    {
        return this.context.rowsPerPage
    }

    public sort(orderBy: OrderBy<T>)
    {
        this.setPage(1)
        this.sortHandler.sort(orderBy)
    }

    public applySorting( params: { orderBy: OrderBy<T>, direction?: 'asc' | 'desc' } = null )
    {
        this.sortHandler.applySorting(params)
    }

    public sortAsc(orderBy: OrderBy<T>)
    {
        this.setPage(1)
        this.sortHandler.sortAsc(orderBy)
    }

    public sortDesc(orderBy: OrderBy<T>)
    {
        this.setPage(1)
        this.sortHandler.sortDesc(orderBy)
    }

    public getSorted(): Writable<{ identifier?: string, direction?: 'asc' | 'desc' }>
    {
        return this.context.sorted
    }

    public search(value: string, scope: (keyof T)[] = null)
    {
        this.searchHandler.set(value, scope)
    }

    public clearSearch()
    {
        this.searchHandler.remove()
    }

    public filter( value: string, filterBy: FilterBy<T>, comparator: Comparator<T> = null )
    {
        return this.filterHandler.set(value as string | number, filterBy, comparator)
    }

    public clearFilters(): void
    {
        this.filterHandler.remove()
    }

    public getPages(params = { ellipsis: false }): Readable<number[]>
    {
        if (params.ellipsis) {
            return this.context.pagesWithEllipsis
        }
        return this.context.pages
    }

    public getPageCount(): Readable<number>
    {
        return this.context.pageCount
    }

    public getPageNumber(): Readable<number>
    {
        return this.context.pageNumber
    }

    public setPage(value: number | 'previous' | 'next'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public getTriggerChange(): Writable<number>
    {
        return this.context.triggerChange
    }

    public translate(i18n: Internationalization): Internationalization
    {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next'
            },
            ...i18n
        }
    }

    /**
     * Deprecated
     * use setRows() instead
     */
    public update(data: any[]): void
    {
        console.log(
            '%c%s',
            'color:#e65100;background:#fff3e0;font-size:12px;border-radius:4px;padding:4px;text-align:center;',
            `DataHandler.update(data) method is deprecated. Please use DataHandler.setRows(data) instead`
        )
        this.context.rawRows.set(data)
    }
}