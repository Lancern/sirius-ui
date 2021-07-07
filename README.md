# sirius-ui

This is the frontend of my personal blog site. The data of my blogs is hosted on [Notion](https://www.notion.so/). The project is carefully designed and coded so that you should be easily port this project to be your persinal blog site. For more information on porting this site, please refer to the docs (which is still under construction).

## Build and Run

Clone this project to local:

```bash
git clone https://github.com/Lancern/sirius-ui.git
cd sirius-ui
```

Install dependent packages via `npm`:

```bash
npm i
```

Before launching the server, you need to find out the notion page ID of your blogs list. Then export the page ID via the `NOTION_POSTS_TABLE_ID` environment variable:

```bash
export NOTION_POSTS_TABLE_ID=<pageId>
```

Then run a local development server:

```bash
npm run dev
```

Then the site can be accessed at https://localhost:3000.

## Contribution

If you have any questions, bug reports or suggestions about this project, feel free to open an issue or a pull request.

## License

This project is open-sourced under [MIT License](./LICENSE).
