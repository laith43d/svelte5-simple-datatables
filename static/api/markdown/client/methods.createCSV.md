
Export data to a CSV file and download it.

## Usage

```ts
const csv = table.createCSV()
```
```svelte
<button onclick={() => csv.download('filename.csv')}>Download as CSV</button>
```