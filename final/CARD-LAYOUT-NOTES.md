# Menu card layout

The menu displays 15 soup cards from `data/soups.json`.

- Desktop (over 900px): 3 equal-width columns, 5 rows.
- Tablet (601–900px): 2 equal-width columns.
- Mobile (up to 600px): 1 column.
- Each card uses the same image aspect ratio and has its buttons aligned at the bottom.
- Filtering or showing saved dishes changes the number of visible cards intentionally.
- All images are local; two are temporary substitutes pending accurate photographs.

To test, open `menu.html` using Live Server, select **All soups**, uncheck **Saved soups only**, and confirm the count reads `15 of 15 soups`.
