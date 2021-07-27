describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-example&viewMode=story');
        const image = await page.screenshot();
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('appWithRedux', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('editableSpan', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('taskIsDoneExample', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

describe('taskIsNotDoneExample', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});