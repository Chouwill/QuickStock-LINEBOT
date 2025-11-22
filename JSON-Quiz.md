# JSON 結構理解測驗

## 📝 測驗說明

本測驗分為四個部分，難度由淺入深：
1. **基礎題**：JSON 結構辨識（10 題）
2. **中級題**：路徑存取（10 題）
3. **進階題**：實際應用（5 題）
4. **實作題**：寫程式碼（5 題）

**建議時間：** 30-45 分鐘
**評分標準：** 每題 10 分，滿分 300 分

---

## 第一部分：基礎題 - JSON 結構辨識

### 題目 1

以下 JSON 結構中，`users` 是什麼類型？

```json
{
  "users": ["小明", "小華", "小美"]
}
```

- [ ] A. 物件
- [ ] B. 陣列
- [ ] C. 字串
- [ ] D. 數字

<details>
<summary>查看答案</summary>

**答案：B. 陣列**

`users` 的值是用 `[]` 包起來的，所以是陣列。

</details>

---

### 題目 2

以下 JSON 中，`person` 是什麼類型？

```json
{
  "person": {
    "name": "小明",
    "age": 25
  }
}
```

- [ ] A. 物件
- [ ] B. 陣列
- [ ] C. 字串
- [ ] D. 數字

<details>
<summary>查看答案</summary>

**答案：A. 物件**

`person` 的值是用 `{}` 包起來的，所以是物件。

</details>

---

### 題目 3

以下 JSON 中，`items` 陣列有幾個元素？

```json
{
  "items": [
    { "name": "蘋果" },
    { "name": "香蕉" },
    { "name": "橘子" }
  ]
}
```

- [ ] A. 1 個
- [ ] B. 2 個
- [ ] C. 3 個
- [ ] D. 4 個

<details>
<summary>查看答案</summary>

**答案：C. 3 個**

陣列中有 3 個物件元素。

</details>

---

### 題目 4

以下 JSON 中，`data[1]` 的值是什麼？

```json
{
  "data": ["第一", "第二", "第三"]
}
```

- [ ] A. "第一"
- [ ] B. "第二"
- [ ] C. "第三"
- [ ] D. undefined

<details>
<summary>查看答案</summary>

**答案：B. "第二"**

陣列索引從 0 開始，所以 `[1]` 是第二個元素。

</details>

---

### 題目 5

以下 JSON 中，`user.name` 的值是什麼？

```json
{
  "user": {
    "name": "小明",
    "age": 25
  }
}
```

- [ ] A. "user"
- [ ] B. "name"
- [ ] C. "小明"
- [ ] D. 25

<details>
<summary>查看答案</summary>

**答案：C. "小明"**

`user.name` 表示 `user` 物件的 `name` 屬性值。

</details>

---

### 題目 6

以下 JSON 中，`config.settings[0]` 的值是什麼？

```json
{
  "config": {
    "settings": ["設定1", "設定2"]
  }
}
```

- [ ] A. "config"
- [ ] B. "settings"
- [ ] C. "設定1"
- [ ] D. "設定2"

<details>
<summary>查看答案</summary>

**答案：C. "設定1"**

`config.settings[0]` 表示 `config` 物件的 `settings` 陣列的第一個元素。

</details>

---

### 題目 7

以下 JSON 中，`list[0].value` 的值是什麼？

```json
{
  "list": [
    { "value": 100 },
    { "value": 200 }
  ]
}
```

- [ ] A. 100
- [ ] B. 200
- [ ] C. 0
- [ ] D. undefined

<details>
<summary>查看答案</summary>

**答案：A. 100**

`list[0]` 是第一個物件 `{ value: 100 }`，所以 `list[0].value` 是 100。

</details>

---

### 題目 8

以下 JSON 中，`box.contents` 是什麼類型？

```json
{
  "box": {
    "contents": [
      { "type": "text" },
      { "type": "button" }
    ]
  }
}
```

- [ ] A. 物件
- [ ] B. 陣列
- [ ] C. 字串
- [ ] D. 數字

<details>
<summary>查看答案</summary>

**答案：B. 陣列**

`contents` 的值是用 `[]` 包起來的，所以是陣列。

</details>

---

### 題目 9

以下 JSON 中，`items[1].name` 的值是什麼？

```json
{
  "items": [
    { "name": "蘋果", "price": 50 },
    { "name": "香蕉", "price": 30 },
    { "name": "橘子", "price": 40 }
  ]
}
```

- [ ] A. "蘋果"
- [ ] B. "香蕉"
- [ ] C. "橘子"
- [ ] D. 30

<details>
<summary>查看答案</summary>

**答案：B. "香蕉"**

`items[1]` 是第二個物件 `{ name: "香蕉", price: 30 }`，所以 `items[1].name` 是 "香蕉"。

</details>

---

### 題目 10

以下 JSON 中，`data[0].info.value` 的值是什麼？

```json
{
  "data": [
    {
      "info": {
        "value": "測試"
      }
    }
  ]
}
```

- [ ] A. "data"
- [ ] B. "info"
- [ ] C. "value"
- [ ] D. "測試"

<details>
<summary>查看答案</summary>

**答案：D. "測試"**

`data[0]` 是第一個物件，`data[0].info` 是 `{ value: "測試" }`，所以 `data[0].info.value` 是 "測試"。

</details>

---

## 第二部分：中級題 - 路徑存取

假設有以下 JSON 結構（來自 `cardOption.json`）：

```json
{
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://example.com/image1.png"
      },
      "body": {
        "type": "box",
        "contents": [
          {
            "type": "text",
            "text": "查詢匯率"
          }
        ]
      },
      "footer": {
        "type": "box",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "text": "查詢匯率"
            }
          }
        ]
      }
    },
    {
      "type": "bubble",
      "footer": {
        "contents": [
          {
            "action": {
              "text": "查詢股票"
            }
          }
        ]
      }
    }
  ]
}
```

### 題目 11

要取得最外層的 `type` 值，正確的路徑是？

- [ ] A. `template.type`
- [ ] B. `template[0].type`
- [ ] C. `template.contents.type`
- [ ] D. `template.type[0]`

<details>
<summary>查看答案</summary>

**答案：A. `template.type`**

最外層是物件，直接用 `.type` 存取。

</details>

---

### 題目 12

要取得第一個 bubble 的 `type` 值，正確的路徑是？

- [ ] A. `template.contents.type`
- [ ] B. `template.contents[0].type`
- [ ] C. `template[0].type`
- [ ] D. `template.type[0]`

<details>
<summary>查看答案</summary>

**答案：B. `template.contents[0].type`**

`contents` 是陣列，第一個元素用 `[0]`，然後用 `.type` 存取屬性。

</details>

---

### 題目 13

要取得第一個 bubble 的 hero 圖片 URL，正確的路徑是？

- [ ] A. `template.contents[0].hero.url`
- [ ] B. `template.contents[0].hero[0].url`
- [ ] C. `template.hero.url`
- [ ] D. `template[0].hero.url`

<details>
<summary>查看答案</summary>

**答案：A. `template.contents[0].hero.url`**

`contents[0]` 是第一個 bubble，`hero` 是物件，直接用 `.url` 存取。

</details>

---

### 題目 14

要取得第一個 bubble 的 body 中第一個文字的內容，正確的路徑是？

- [ ] A. `template.contents[0].body.contents.text`
- [ ] B. `template.contents[0].body.contents[0].text`
- [ ] C. `template.contents[0].body.text`
- [ ] D. `template.body.contents[0].text`

<details>
<summary>查看答案</summary>

**答案：B. `template.contents[0].body.contents[0].text`**

`body.contents` 是陣列，第一個元素用 `[0]`，然後用 `.text` 存取。

</details>

---

### 題目 15

要取得第一個按鈕的 `text` 值（"查詢匯率"），正確的路徑是？

- [ ] A. `template.contents[0].footer.contents.action.text`
- [ ] B. `template.contents[0].footer.contents[0].action.text`
- [ ] C. `template.contents.footer.contents[0].action.text`
- [ ] D. `template.footer.contents[0].action.text`

<details>
<summary>查看答案</summary>

**答案：B. `template.contents[0].footer.contents[0].action.text`**

需要先到第一個 bubble `contents[0]`，然後 `footer.contents[0]` 是第一個按鈕，最後 `action.text` 是文字值。

</details>

---

### 題目 16

要取得第二個 bubble 的按鈕文字（"查詢股票"），正確的路徑是？

- [ ] A. `template.contents[1].footer.contents[0].action.text`
- [ ] B. `template.contents[2].footer.contents[0].action.text`
- [ ] C. `template.contents[0].footer.contents[1].action.text`
- [ ] D. `template.footer.contents[1].action.text`

<details>
<summary>查看答案</summary>

**答案：A. `template.contents[1].footer.contents[0].action.text`**

第二個 bubble 用 `contents[1]`（索引從 0 開始），然後 `footer.contents[0]` 是第一個按鈕。

</details>

---

### 題目 17

以下哪個路徑可以取得 `contents` 陣列的長度？

- [ ] A. `template.contents.length`
- [ ] B. `template.length`
- [ ] C. `template.contents[].length`
- [ ] D. `template[0].length`

<details>
<summary>查看答案</summary>

**答案：A. `template.contents.length`**

陣列有 `length` 屬性，可以直接用 `.length` 取得。

</details>

---

### 題目 18

要檢查第一個 bubble 是否有 `hero` 屬性，應該用？

- [ ] A. `template.contents[0].hero !== undefined`
- [ ] B. `template.contents[0].hero === null`
- [ ] C. `template.contents[0].hero === "hero"`
- [ ] D. `template.contents[0]["hero"] === true`

<details>
<summary>查看答案</summary>

**答案：A. `template.contents[0].hero !== undefined`**

如果屬性存在，值不會是 `undefined`。

</details>

---

### 題目 19

要取得第一個 bubble 的 body 中所有文字的內容，應該用？

- [ ] A. `template.contents[0].body.contents[].text`
- [ ] B. `template.contents[0].body.contents.map(item => item.text)`
- [ ] C. `template.contents[0].body.text`
- [ ] D. `template.contents[0].body.contents.text`

<details>
<summary>查看答案</summary>

**答案：B. `template.contents[0].body.contents.map(item => item.text)`**

需要用 `map` 方法遍歷陣列，取得每個元素的 `text` 屬性。

</details>

---

### 題目 20

假設 `template.contents[0].footer.contents` 陣列有多個按鈕，要取得所有按鈕的 `text`，應該用？

- [ ] A. `template.contents[0].footer.contents.text`
- [ ] B. `template.contents[0].footer.contents.map(btn => btn.action.text)`
- [ ] C. `template.contents[0].footer.contents[0].action.text`
- [ ] D. `template.contents[0].footer.text`

<details>
<summary>查看答案</summary>

**答案：B. `template.contents[0].footer.contents.map(btn => btn.action.text)`**

需要用 `map` 遍歷陣列，每個按鈕的 `text` 在 `action.text` 中。

</details>

---

## 第三部分：進階題 - 實際應用

### 題目 21

在 `cardOption.json` 中，如果要取得第一個 bubble 的 body 中第二個文字的內容（"快速查看各國幣值匯率"），正確的路徑是？

請寫出完整的 JavaScript 程式碼：

```javascript
// 你的答案：

```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
const text = template.contents[0].body.contents[1].text;
console.log(text); // "快速查看各國幣值匯率"
```

`body.contents[1]` 是第二個文字元素（索引從 0 開始）。

</details>

---

### 題目 22

在 `cardOption.json` 中，如果要取得第一個 bubble 的 hero 圖片的 `aspectRatio` 值，正確的路徑是？

請寫出完整的 JavaScript 程式碼：

```javascript
// 你的答案：

```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
const aspectRatio = template.contents[0].hero.aspectRatio;
console.log(aspectRatio); // "20:13"
```

`hero` 是物件，直接用 `.aspectRatio` 存取。

</details>

---

### 題目 23

在 `cardOption.json` 中，如果要取得第一個按鈕的 `color` 值（按鈕顏色），正確的路徑是？

請寫出完整的 JavaScript 程式碼：

```javascript
// 你的答案：

```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
const color = template.contents[0].footer.contents[0].color;
console.log(color); // "#1B73E8"
```

`footer.contents[0]` 是第一個按鈕，直接用 `.color` 存取。

</details>

---

### 題目 24

在 `cardOption.json` 中，如果要取得第二個 bubble 的 body 中第一個文字的 `color` 值，正確的路徑是？

請寫出完整的 JavaScript 程式碼：

```javascript
// 你的答案：

```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
const color = template.contents[1].body.contents[0].color;
console.log(color); // "#00AA00"
```

`contents[1]` 是第二個 bubble，`body.contents[0]` 是第一個文字元素。

</details>

---

### 題目 25

在 `cardOption.json` 中，如果要取得第一個按鈕的 `action.type` 值，正確的路徑是？

請寫出完整的 JavaScript 程式碼：

```javascript
// 你的答案：

```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
const actionType = template.contents[0].footer.contents[0].action.type;
console.log(actionType); // "message"
```

`action` 是物件，直接用 `.type` 存取。

</details>

---

## 第四部分：實作題 - 寫程式碼

### 題目 26

請寫一個函數，接收 `template` 物件，回傳所有按鈕的 `text` 值陣列。

```javascript
function getAllButtonTexts(template) {
  // 你的答案：

}
```

**提示：** 需要遍歷 `contents` 陣列，然後遍歷每個 bubble 的 `footer.contents` 陣列。

<details>
<summary>查看答案</summary>

**答案：**

```javascript
function getAllButtonTexts(template) {
  const buttonTexts = [];

  // 遍歷所有 bubble
  template.contents.forEach((bubble) => {
    // 檢查是否有 footer 和 contents
    if (bubble.footer && bubble.footer.contents) {
      // 遍歷 footer 中的所有按鈕
      bubble.footer.contents.forEach((button) => {
        if (button.action && button.action.text) {
          buttonTexts.push(button.action.text);
        }
      });
    }
  });

  return buttonTexts;
}

// 使用範例
const texts = getAllButtonTexts(template);
console.log(texts); // ["查詢匯率", "查詢股票"]
```

</details>

---

### 題目 27

請寫一個函數，接收 `template` 物件和索引 `index`，回傳該 bubble 的 body 中所有文字的內容陣列。

```javascript
function getBubbleBodyTexts(template, index) {
  // 你的答案：

}
```

**提示：** `index` 是 bubble 的索引（0 或 1）。

<details>
<summary>查看答案</summary>

**答案：**

```javascript
function getBubbleBodyTexts(template, index) {
  const bubble = template.contents[index];

  if (!bubble || !bubble.body || !bubble.body.contents) {
    return [];
  }

  return bubble.body.contents
    .filter((item) => item.type === "text")
    .map((item) => item.text);
}

// 使用範例
const texts1 = getBubbleBodyTexts(template, 0);
console.log(texts1); // ["查詢匯率", "快速查看各國幣值匯率"]

const texts2 = getBubbleBodyTexts(template, 1);
console.log(texts2); // ["查詢台股股票", "即時掌握台股走勢與股價"]
```

</details>

---

### 題目 28

請寫一個函數，接收 `template` 物件，回傳所有 bubble 的 `type` 值陣列。

```javascript
function getAllBubbleTypes(template) {
  // 你的答案：

}
```

<details>
<summary>查看答案</summary>

**答案：**

```javascript
function getAllBubbleTypes(template) {
  return template.contents.map((bubble) => bubble.type);
}

// 使用範例
const types = getAllBubbleTypes(template);
console.log(types); // ["bubble", "bubble"]
```

</details>

---

### 題目 29

請寫一個函數，接收 `template` 物件和按鈕文字 `buttonText`，回傳該按鈕所在的 bubble 索引，如果找不到回傳 -1。

```javascript
function findBubbleIndexByButtonText(template, buttonText) {
  // 你的答案：

}
```

**提示：** 需要遍歷所有 bubble，檢查每個 bubble 的按鈕文字。

<details>
<summary>查看答案</summary>

**答案：**

```javascript
function findBubbleIndexByButtonText(template, buttonText) {
  for (let i = 0; i < template.contents.length; i++) {
    const bubble = template.contents[i];

    if (bubble.footer && bubble.footer.contents) {
      const button = bubble.footer.contents.find(
        (btn) => btn.action && btn.action.text === buttonText
      );

      if (button) {
        return i;
      }
    }
  }

  return -1;
}

// 使用範例
const index1 = findBubbleIndexByButtonText(template, "查詢匯率");
console.log(index1); // 0

const index2 = findBubbleIndexByButtonText(template, "查詢股票");
console.log(index2); // 1

const index3 = findBubbleIndexByButtonText(template, "不存在的按鈕");
console.log(index3); // -1
```

</details>

---

### 題目 30

請寫一個函數，接收 `stockUse.json` 的內容（假設已匯入為 `stockUse`），回傳 body 中所有文字的內容陣列。

```javascript
function getStockUseTexts(stockUse) {
  // 你的答案：

}
```

**提示：** `stockUse` 的結構是 `{ type: "bubble", body: { contents: [...] } }`

<details>
<summary>查看答案</summary>

**答案：**

```javascript
function getStockUseTexts(stockUse) {
  if (!stockUse.body || !stockUse.body.contents) {
    return [];
  }

  return stockUse.body.contents
    .filter((item) => item.type === "text")
    .map((item) => item.text);
}

// 使用範例
import stockUse from "./templates/stockUse.json" with { type: "json" };
const texts = getStockUseTexts(stockUse);
console.log(texts);
// ["股票查詢", "請輸入股票代號（例如：0056）", "小提示：輸入數字後我會自動查詢"]
```

</details>

---

## 📊 評分標準

### 第一部分：基礎題（10 題，每題 10 分）
- 90-100 分：優秀！你完全理解 JSON 的基本結構
- 70-89 分：良好！還有一些細節需要加強
- 50-69 分：需要多練習 JSON 結構辨識
- 0-49 分：建議重新閱讀基礎章節

### 第二部分：中級題（10 題，每題 10 分）
- 90-100 分：優秀！你完全理解如何存取 JSON 路徑
- 70-89 分：良好！路徑存取的概念已經掌握
- 50-69 分：需要多練習路徑存取
- 0-49 分：建議重新練習路徑存取

### 第三部分：進階題（5 題，每題 10 分）
- 45-50 分：優秀！你可以實際應用 JSON 路徑存取
- 35-44 分：良好！大部分題目都能正確解答
- 25-34 分：需要多練習實際應用
- 0-24 分：建議重新練習實際應用

### 第四部分：實作題（5 題，每題 10 分）
- 45-50 分：優秀！你可以寫出完整的程式碼來處理 JSON
- 35-44 分：良好！程式邏輯正確，可能有小細節需要調整
- 25-34 分：需要多練習寫程式碼
- 0-24 分：建議重新學習 JavaScript 陣列方法（map, forEach, filter）

---

## 🎯 總分評級

- **270-300 分**：🏆 大師級！你完全掌握 JSON 結構和路徑存取
- **240-269 分**：🥇 優秀！你對 JSON 有很好的理解
- **210-239 分**：🥈 良好！還有一些細節需要加強
- **180-209 分**：🥉 及格！需要多練習
- **0-179 分**：📚 需要重新學習基礎概念

---

## 💡 學習建議

### 如果基礎題得分較低：
1. 重新閱讀「JSON 基礎概念與如何查看」章節
2. 多練習辨識物件和陣列
3. 理解索引從 0 開始的概念

### 如果中級題得分較低：
1. 重新閱讀「如何展開 JSON 結構」章節
2. 練習寫出完整的路徑
3. 理解 `.` 和 `[]` 的差異

### 如果進階題得分較低：
1. 實際打開 `cardOption.json` 檔案查看結構
2. 用 console.log 逐步展開 JSON
3. 練習找出不同屬性的路徑

### 如果實作題得分較低：
1. 學習 JavaScript 陣列方法：`map`, `forEach`, `filter`, `find`
2. 練習寫迴圈來遍歷陣列
3. 理解如何處理巢狀結構

---

**祝測驗順利！** 🎉

