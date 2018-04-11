/* global describe, it, expect, afterAll, beforeAll */
import puppeteer from 'puppeteer';
import server from '../server';

const waitAndGetInnerTextBySelector = async selector => {
  await page.waitForSelector(selector);
  const val = await page.$eval(selector, node => node.innerText);
  return val;
};

const waitForAndClick = async selector => {
  await page.waitFor(selector);
  await page.click(selector);
};

const BASE_URL = 'http://localhost:8080';
let browser, page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  page = await browser.newPage();
});

describe('/', () => {
  it(
    'renders correctly',
    async () => {
      await page.goto(`${BASE_URL}/`);
      const $search = await page.$('[type="search"]');
      const $goButton = await page.$('[data-test-id="search-button"]');
      [$search, $goButton].every(node => expect(node).not.toBeNull());
    },
    20000
  );
  it(
    '[G] searches "qnjqnh" as "Teerath Naavan Jao", and goes next and previous',
    async () => {
      await page.goto(`${BASE_URL}/`);
      await page.waitForSelector('[type="search"]');
      await page.type('[type="search"]', 'qnjqnh');
      await page.click('[data-test-id="search-button"]');
      expect(await waitAndGetInnerTextBySelector('#line-29638')).toMatch(
        'qIriQ nwvx jwau qIrQu nwmu hY ]'
      );
      // TODO: Figure out why we need to double click
      await waitForAndClick('[title="Next"]');
      expect(await waitAndGetInnerTextBySelector('#line-29663')).toMatch(
        'jIvw qyrY nwie min Awnµdu hY jIau ]'
      );
      // TODO: Figure out why we need to double click
      await waitForAndClick('[title="Previous"]');
      expect(await waitAndGetInnerTextBySelector('#line-29638')).toMatch(
        'qIriQ nwvx jwau qIrQu nwmu hY ]'
      );
    },

    25000
  );

  it(
    '[D] searches "sksls" as "Sach Kahoun Sun"',
    async () => {
      await page.goto(`${BASE_URL}/`);
      await page.waitForSelector('[type="search"]');
      await page.type('[type="search"]', 'sksls');
      await page.select('[name="source"]', 'D');
      await page.click('[data-test-id="search-button"]');
      expect(await waitAndGetInnerTextBySelector('#line-75146')).toMatch(
        'swcu khO sun lyhu sBY ijn pRym kIE iqn hI pRBu pwieE ]9]29]'
      );
      // TODO: Figure out why we need so many clicks
      await waitForAndClick('[title="Open Pannaa"]');
      await waitForAndClick('[title="Open Pannaa"]');
      await waitForAndClick('[title="Open Pannaa"]');
      expect(await page.evaluate(() => location.href)).toMatch('ang=12');
      await waitForAndClick('[title="Next"]');
      // TODO: Use better way to detect this
      expect(await page.evaluate(() => location.href)).toMatch('ang=13');
      await waitForAndClick('[title="Previous"]');
      expect(await page.evaluate(() => location.href)).toMatch('ang=12');
    },
    20000
  );
  it(
    '[B] searches "nsls" as "Nakh Sis Lo"',
    async () => {
      await page.goto(`${BASE_URL}/`);
      await page.waitForSelector('[type="search"]');
      await page.type('[type="search"]', 'nsls');
      await page.select('[name="source"]', 'B');
      await page.click('[data-test-id="search-button"]');
      expect(await waitAndGetInnerTextBySelector('#line-210463')).toMatch(
        'nK iss lau sgl AMg rom rom kir kwit kwit isKn ky crn pr vwrIAY ]'
      );
      await page.click('[data-test-id="display-options"]');
      await waitForAndClick('[data-test-id="split-view"]');
      await page.waitFor('.split-view-baani');
      expect(
        await page.$eval('.split-view-baani', n =>
          n.innerText.replace(/\n/g, ' ')
        )
      ).toMatch(
        'nK iss lau sgl AMg rom rom kir kwit kwit isKn ky crn pr vwrIAY ] Agin jlwie Puin pIsn pswie qWih lY aufY pvn hoie Aink pRkwrIAY ] jq kq isK pg DrY gur pMQ pRwq qwhU qwhU mwrg mih Bsm kY fwrIAY ]'
      );
    },
    20000
  );
});

afterAll(async () => {
  await browser.close();
  await server.close();
});
