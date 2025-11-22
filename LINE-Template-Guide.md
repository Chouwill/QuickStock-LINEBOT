# LINE Bot JSON 模板判斷機制說明

## 📋 目錄

1. [JSON 基礎概念與如何查看](#json-基礎概念與如何查看)
   - [什麼是 JSON？](#什麼是-json)
   - [JSON 的兩種基本結構](#json-的兩種基本結構)
   - [為什麼物件可以包含陣列？](#為什麼物件可以包含陣列)
   - [如何展開 JSON 結構](#如何展開-json-結構)
   - [實際查看 JSON 的方法](#實際查看-json-的方法)
2. [如何查看 Template JSON 結構](#如何查看-template-json-結構)
3. [如何從 JSON 提取按鈕文字](#如何從-json-提取按鈕文字)
4. [狀態判斷流程](#狀態判斷流程)
5. [完整執行步驟](#完整執行步驟)
6. [實際範例](#實際範例)

---

## JSON 基礎概念與如何查看

### 什麼是 JSON？

**JSON（JavaScript Object Notation）** 是一種資料格式，用來儲存和傳輸結構化資料。

#### JSON 的基本規則

1. **鍵值對（Key-Value Pair）**

   ```json
   {
     "name": "小明",
     "age": 25
   }
   ```

   - `"name"` 是鍵（key）
   - `"小明"` 是值（value）
   - 鍵必須用雙引號包起來

2. **物件（Object）** - 用 `{}` 包起來

   ```json
   {
     "type": "carousel",
     "contents": []
   }
   ```

3. **陣列（Array）** - 用 `[]` 包起來

   ```json
   ["蘋果", "香蕉", "橘子"]
   ```

4. **巢狀結構** - 物件裡面可以放陣列，陣列裡面可以放物件
   ```json
   {
     "users": [
       { "name": "小明", "age": 25 },
       { "name": "小華", "age": 30 }
     ]
   }
   ```

---

### JSON 的兩種基本結構

#### 1. 物件（Object）`{}`

物件是一組**鍵值對**的集合，用大括號 `{}` 包起來。

```json
{
  "type": "carousel",
  "contents": []
}
```

**特點：**

- 每個鍵都是**唯一的字串**
- 值可以是：字串、數字、布林值、物件、陣列、null
- 用 `.` 或 `[]` 來存取屬性

**JavaScript 存取方式：**

```javascript
const obj = { type: "carousel", contents: [] };

// 方式 1：點記號（Dot Notation）
obj.type; // "carousel"

// 方式 2：方括號（Bracket Notation）
obj["type"]; // "carousel"
obj["contents"]; // []
```

#### 2. 陣列（Array）`[]`

陣列是一組**有序的值**，用方括號 `[]` 包起來。

```json
["查詢匯率", "查詢股票"]
```

**特點：**

- 元素有**順序**（從 0 開始編號）
- 值可以是：字串、數字、布林值、物件、陣列、null
- 用**索引（index）** 來存取元素

**JavaScript 存取方式：**

```javascript
const arr = ["查詢匯率", "查詢股票"];

arr[0]; // "查詢匯率"（第一個元素）
arr[1]; // "查詢股票"（第二個元素）
```

---

### 為什麼物件可以包含陣列？

這是 JSON 的核心特性：**值可以是任何類型**，包括物件和陣列。

#### 範例 1：物件包含陣列

```json
{
  "type": "carousel",
  "contents": [        ← 陣列作為物件的值
    { "type": "bubble" },
    { "type": "bubble" }
  ]
}
```

**為什麼這樣設計？**

- `contents` 是一個**陣列**，因為可能有多個卡片（bubble）
- 每個卡片是一個**物件**，有自己的屬性
- 這樣可以靈活地**動態增加或減少**卡片數量

#### 範例 2：陣列包含物件

```json
[
  {                    ← 物件作為陣列的元素
    "type": "text",
    "text": "查詢匯率"
  },
  {
    "type": "text",
    "text": "查詢股票"
  }
]
```

**為什麼這樣設計？**

- 陣列可以**有序地**儲存多個物件
- 每個物件代表一個 UI 元素（文字、按鈕等）
- 可以透過索引 `[0]`, `[1]` 來存取特定元素

#### 範例 3：多層巢狀結構

```json
{
  "type": "carousel",
  "contents": [                    ← 第一層：陣列
    {
      "type": "bubble",
      "footer": {                  ← 第二層：物件
        "contents": [              ← 第三層：陣列
          {
            "type": "button",
            "action": {            ← 第四層：物件
              "text": "查詢匯率"   ← 第五層：字串值
            }
          }
        ]
      }
    }
  ]
}
```

**為什麼需要這麼多層？**

- LINE Bot 的 Flex Message 需要**複雜的 UI 結構**
- 每一層都有特定的用途：
  - `contents` 陣列 → 可以放多個元素
  - `footer` 物件 → 定義底部區域的屬性
  - `action` 物件 → 定義按鈕的行為

---

### 如何展開 JSON 結構

「展開」的意思是**逐步深入**，一層一層地查看 JSON 的內容。

#### 方法 1：視覺化樹狀結構

以 `cardOption.json` 為例，我們可以這樣展開：

```
第 1 層：最外層物件
{
  "type": "carousel",
  "contents": [...]  ← 這裡是陣列，需要展開
}
         ↓
第 2 層：contents 陣列的第一個元素（索引 0）
contents[0] = {
  "type": "bubble",
  "footer": {...}  ← 這裡是物件，需要展開
}
         ↓
第 3 層：footer 物件
footer = {
  "contents": [...]  ← 這裡又是陣列，需要展開
}
         ↓
第 4 層：footer.contents 陣列的第一個元素（索引 0）
footer.contents[0] = {
  "type": "button",
  "action": {...}  ← 這裡是物件，需要展開
}
         ↓
第 5 層：action 物件
action = {
  "type": "message",
  "text": "查詢匯率"  ← 終於找到目標值了！
}
```

#### 方法 2：用程式碼逐步展開

```javascript
// 第 1 步：查看最外層
console.log("第 1 層 - 整個 template：", template);
// 輸出：{ type: "carousel", contents: [...] }

// 第 2 步：查看 contents 陣列
console.log("第 2 層 - contents 陣列：", template.contents);
// 輸出：[{ type: "bubble", ... }, { type: "bubble", ... }]

// 第 3 步：查看第一個 bubble（索引 0）
console.log("第 3 層 - 第一個 bubble：", template.contents[0]);
// 輸出：{ type: "bubble", footer: {...}, body: {...}, hero: {...} }

// 第 4 步：查看 footer 物件
console.log("第 4 層 - footer：", template.contents[0].footer);
// 輸出：{ type: "box", contents: [...] }

// 第 5 步：查看 footer.contents 陣列
console.log(
  "第 5 層 - footer.contents：",
  template.contents[0].footer.contents
);
// 輸出：[{ type: "button", action: {...} }]

// 第 6 步：查看第一個按鈕（索引 0）
console.log("第 6 層 - 第一個按鈕：", template.contents[0].footer.contents[0]);
// 輸出：{ type: "button", action: {...} }

// 第 7 步：查看 action 物件
console.log(
  "第 7 層 - action：",
  template.contents[0].footer.contents[0].action
);
// 輸出：{ type: "message", text: "查詢匯率" }

// 第 8 步：取得目標值
console.log(
  "第 8 層 - text 值：",
  template.contents[0].footer.contents[0].action.text
);
// 輸出："查詢匯率"
```

#### 方法 3：用路徑字串理解

把整個路徑寫成一行：

```javascript
template.contents[0].footer.contents[0].action.text;
```

**如何讀懂這個路徑？**

1. `template` → 最外層物件
2. `.contents` → 物件的 `contents` 屬性（是一個陣列）
3. `[0]` → 陣列的第一個元素（索引 0）
4. `.footer` → 這個元素的 `footer` 屬性（是一個物件）
5. `.contents` → `footer` 物件的 `contents` 屬性（是一個陣列）
6. `[0]` → 這個陣列的第一個元素（索引 0）
7. `.action` → 這個元素的 `action` 屬性（是一個物件）
8. `.text` → `action` 物件的 `text` 屬性（是字串值）

**記憶技巧：**

- `.` 後面是**物件的屬性**
- `[數字]` 是**陣列的索引**
- 從左到右，一層一層深入

---

### 實際查看 JSON 的方法

#### 方法 1：在程式碼中使用 console.log

```javascript
import template from "./templates/cardOption.json" with { type: "json" };

// 查看完整 JSON（會顯示在一行，不易閱讀）
console.log("完整 JSON：", template);

// 使用 JSON.stringify 格式化輸出（更易讀）
console.log("格式化 JSON：", JSON.stringify(template, null, 2));
```

**輸出範例：**

```json
{
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "footer": {
        "contents": [
          {
            "action": {
              "text": "查詢匯率"
            }
          }
        ]
      }
    }
  ]
}
```

#### 方法 2：逐步展開查看

```javascript
// 建立一個輔助函數來逐步展開
function exploreJSON(obj, path = "root", depth = 0) {
  const indent = "  ".repeat(depth);

  if (Array.isArray(obj)) {
    console.log(`${indent}${path} = [陣列，長度：${obj.length}]`);
    obj.forEach((item, index) => {
      exploreJSON(item, `${path}[${index}]`, depth + 1);
    });
  } else if (typeof obj === "object" && obj !== null) {
    console.log(`${indent}${path} = {物件}`);
    Object.keys(obj).forEach((key) => {
      exploreJSON(obj[key], `${path}.${key}`, depth + 1);
    });
  } else {
    console.log(`${indent}${path} = ${obj} (${typeof obj})`);
  }
}

// 使用範例
exploreJSON(template);
```

**輸出範例：**

```
root = {物件}
  root.type = carousel (string)
  root.contents = [陣列，長度：2]
    root.contents[0] = {物件}
      root.contents[0].type = bubble (string)
      root.contents[0].footer = {物件}
        root.contents[0].footer.contents = [陣列，長度：1]
          root.contents[0].footer.contents[0] = {物件}
            root.contents[0].footer.contents[0].action = {物件}
              root.contents[0].footer.contents[0].action.text = 查詢匯率 (string)
```

#### 方法 3：在瀏覽器開發者工具查看

如果你在網頁中使用，可以：

1. 打開瀏覽器開發者工具（F12）
2. 在 Console 輸入：
   ```javascript
   console.log(template);
   ```
3. 點擊輸出結果旁邊的 `▶` 來展開物件
4. 逐步點擊 `▶` 來深入查看每一層

#### 方法 4：使用 JSON 格式化工具

線上工具：

- [JSON Formatter](https://jsonformatter.org/)
- [JSON Viewer](https://jsonviewer.stack.hu/)

步驟：

1. 複製 JSON 檔案內容
2. 貼到工具中
3. 點擊 "Format" 或 "Beautify"
4. 工具會自動展開並格式化顯示

#### 方法 5：在 VS Code / Cursor 中查看

1. 打開 JSON 檔案
2. 使用快捷鍵格式化：`Shift + Option + F`（Mac）或 `Shift + Alt + F`（Windows）
3. 使用 `Cmd + K, Cmd + 0`（Mac）或 `Ctrl + K, Ctrl + 0`（Windows）來摺疊所有層級
4. 點擊 `▶` 來展開想查看的部分

---

### 實際練習：展開 cardOption.json

讓我們用實際的 `cardOption.json` 來練習展開 JSON 結構。

#### 練習目標

找到第一個按鈕的 `text` 值（"查詢匯率"）

#### 步驟 1：查看最外層

```javascript
import template from "./templates/cardOption.json" with { type: "json" };

console.log("步驟 1 - 最外層：", template);
```

**你會看到：**

```javascript
{
  type: "carousel",
  contents: [ {...}, {...} ]  // 兩個 bubble 物件
}
```

**觀察重點：**

- 這是一個**物件**（用 `{}` 包起來）
- 有兩個屬性：`type` 和 `contents`
- `contents` 是一個**陣列**（用 `[]` 包起來），裡面有 2 個元素

#### 步驟 2：查看 contents 陣列

```javascript
console.log("步驟 2 - contents 陣列：", template.contents);
console.log("陣列長度：", template.contents.length); // 2
```

**你會看到：**

```javascript
[
  { type: "bubble", hero: {...}, body: {...}, footer: {...} },
  { type: "bubble", hero: {...}, body: {...}, footer: {...} }
]
```

**觀察重點：**

- `contents` 是一個**陣列**，有 2 個元素
- 每個元素都是一個**物件**（bubble）
- 我們要找的是第一個 bubble，所以用 `[0]`

#### 步驟 3：查看第一個 bubble（索引 0）

```javascript
console.log("步驟 3 - 第一個 bubble：", template.contents[0]);
```

**你會看到：**

```javascript
{
  type: "bubble",
  hero: { type: "image", url: "...", ... },
  body: { type: "box", contents: [...] },
  footer: { type: "box", contents: [...] }  // ← 我們要找的按鈕在這裡
}
```

**觀察重點：**

- 第一個 bubble 有 4 個屬性：`type`, `hero`, `body`, `footer`
- 按鈕在 `footer` 裡面，所以下一步要看 `footer`

#### 步驟 4：查看 footer 物件

```javascript
console.log("步驟 4 - footer：", template.contents[0].footer);
```

**你會看到：**

```javascript
{
  type: "box",
  layout: "vertical",
  spacing: "md",
  contents: [ {...} ]  // ← 按鈕在這個陣列裡
}
```

**觀察重點：**

- `footer` 是一個**物件**
- `footer.contents` 是一個**陣列**，裡面有 1 個元素（按鈕）
- 我們要找的是第一個按鈕，所以用 `[0]`

#### 步驟 5：查看第一個按鈕（索引 0）

```javascript
console.log("步驟 5 - 第一個按鈕：", template.contents[0].footer.contents[0]);
```

**你會看到：**

```javascript
{
  type: "button",
  style: "primary",
  color: "#1B73E8",
  action: { type: "message", label: "查詢匯率", text: "查詢匯率" }  // ← 目標在這裡
}
```

**觀察重點：**

- 按鈕是一個**物件**
- `action` 屬性也是一個**物件**，裡面有 `text` 屬性
- `text` 就是我們要找的值！

#### 步驟 6：取得目標值

```javascript
console.log(
  "步驟 6 - 目標值：",
  template.contents[0].footer.contents[0].action.text
);
// 輸出："查詢匯率"
```

**完成！** 🎉

#### 完整路徑回顧

```javascript
template.contents[0].footer.contents[0].action.text; // 第一個 bubble（陣列索引） // footer 物件 // 第一個按鈕（陣列索引） // action 物件 // 目標值（字串）
```

#### 練習題：找出第二個按鈕的文字

試試看，找出第二個按鈕（股票）的 `text` 值！

**提示：**

- 第二個 bubble 的索引是 `[1]`
- 路徑應該是：`template.contents[1].footer.contents[0].action.text`

**答案：**

```javascript
const action2 = template.contents[1].footer.contents[0].action.text;
console.log(action2); // "查詢股票"
```

---

## 如何查看 Template JSON 結構

### 1. 查看檔案位置

Template JSON 檔案位於 `templates/` 目錄下：

- `cardOption.json` - 主選單（匯率/股票選項）
- `stockUse.json` - 股票查詢提示模板
- `stockResult.json` - 股票查詢結果模板

### 2. 理解 JSON 結構

#### cardOption.json 結構解析

```json
{
  "type": "carousel", // 輪播型模板
  "contents": [
    // 內容陣列
    {
      "type": "bubble", // 第一個卡片（匯率）
      "footer": {
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message", // 按鈕類型：發送訊息
              "text": "查詢匯率" // ⭐ 這是關鍵：按鈕點擊後會發送的文字
            }
          }
        ]
      }
    },
    {
      "type": "bubble", // 第二個卡片（股票）
      "footer": {
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "text": "查詢股票" // ⭐ 這是關鍵：按鈕點擊後會發送的文字
            }
          }
        ]
      }
    }
  ]
}
```

### 3. 在程式碼中查看 JSON

```javascript
// 第 6 行：匯入 JSON 檔案
import template from "./templates/cardOption.json" with { type: "json" };

// 第 21 行：深拷貝模板（避免修改原始資料）
const mouldboard = JSON.parse(JSON.stringify(template));

// 第 22 行：在 console 查看完整 JSON 結構
console.log(mouldboard);

// 第 26 行：查看特定欄位
console.log(mouldboard.contents[0].body.contents[0].text); // "查詢匯率"
```

---

## 如何從 JSON 提取按鈕文字

### 關鍵程式碼位置

```54:55:index.js
    const action1 = template.contents[0].footer.contents[0].action.text;
    const action2 = template.contents[1].footer.contents[0].action.text;
```

### 路徑解析

#### action1（第一個按鈕 - 查詢匯率）

```
template
  └── contents[0]                    // 第一個 bubble（匯率卡片）
      └── footer                     // 底部區域
          └── contents[0]            // 第一個按鈕
              └── action             // 按鈕動作
                  └── text           // "查詢匯率"
```

**實際值：** `action1 = "查詢匯率"`

#### action2（第二個按鈕 - 查詢股票）

```
template
  └── contents[1]                    // 第二個 bubble（股票卡片）
      └── footer                     // 底部區域
          └── contents[0]            // 第一個按鈕
              └── action             // 按鈕動作
                  └── text           // "查詢股票"
```

**實際值：** `action2 = "查詢股票"`

### 為什麼要提取這些值？

當使用者點擊 template 中的按鈕時，LINE 會自動發送一個 `message` 事件，其中 `event.message.text` 的值就是按鈕設定的 `action.text`。

所以：

- 使用者點擊「查詢匯率」按鈕 → `event.message.text = "查詢匯率"`
- 使用者點擊「查詢股票」按鈕 → `event.message.text = "查詢股票"`

---

## 狀態判斷流程

### 核心概念：`selectTemplate` 狀態管理

```15:16:index.js
let selectTemplate = "";
let userTextValue = "";
```

`selectTemplate` 用來記錄「使用者目前選擇的功能模式」：

- `""` - 未選擇任何模式
- `"查詢匯率"` - 已選擇匯率查詢模式
- `"查詢股票"` - 已選擇股票查詢模式

### 判斷邏輯流程圖

```
使用者發送訊息
    ↓
event.message.text 收到文字
    ↓
┌─────────────────────────────────┐
│ 是否等於 action1 ("查詢匯率")？  │
└─────────────────────────────────┘
    ↓ 是
設定 selectTemplate = action1
    ↓
┌─────────────────────────────────┐
│ 是否等於 action2 ("查詢股票")？  │
└─────────────────────────────────┘
    ↓ 是
設定 selectTemplate = action2
發送 stockUse 模板（提示輸入股票代號）
    ↓
┌─────────────────────────────────┐
│ 都不是（使用者輸入其他文字）      │
└─────────────────────────────────┘
    ↓
檢查 selectTemplate 狀態
    ↓
┌─────────────────┬─────────────────┐
│ selectTemplate  │   執行對應動作   │
│   === action1   │   匯率查詢功能   │
│   === action2   │   股票查詢功能   │
│   其他          │   無動作         │
└─────────────────┴─────────────────┘
```

### 程式碼對應

```60:89:index.js
    if (userTextValue === action1) {
      console.log("現在狀態：----查詢匯率");
      //await event.reply("查詢匯率")

      selectTemplate = action1; //儲存當前狀態在哪
    } else if (userTextValue === action2) {
      console.log("現在狀態：----進入股票");
      selectTemplate = action2; //儲存當前狀態在哪

      const stockBoard = JSON.parse(JSON.stringify(stockUse));

      console.log(stockBoard);

      const result = await event.reply({
        type: "flex",
        altText: "XXXX",
        contents: stockBoard,
      });

      return result;
    } else {
      if (selectTemplate === action1) {
        // TODO: 匯率查詢功能待實作
      } else if (selectTemplate === action2) {
        commandStock(userTextValue);

        console.log("使用者輸入的代號是", userTextValue);

      }
    }
```

---

## 完整執行步驟

### 步驟 1：使用者加入好友

```
使用者加入 Bot
    ↓
觸發 bot.on("follow") 事件
    ↓
發送 cardOption.json 模板（主選單）
    ↓
使用者看到兩個選項：查詢匯率、查詢股票
```

**對應程式碼：**

```18:38:index.js
bot.on("follow", async (event) => {
  console.log("新用戶已加入");

  const mouldboard = JSON.parse(JSON.stringify(template));
  console.log(mouldboard);

  // mouldboard.contents[0].body.contents.text

  console.log(mouldboard.contents[0].body.contents[0].text);

  // return mouldboard

  // 在被加入好友  發送模板
  const result = await event.reply({
    type: "flex",
    altText: "歡迎使用財匯機器人",
    contents: mouldboard,
  });

  return result;
});
```

### 步驟 2：使用者點擊「查詢股票」按鈕

```
使用者點擊「查詢股票」按鈕
    ↓
LINE 自動發送 message 事件
event.message.text = "查詢股票"
    ↓
程式判斷：userTextValue === action2
    ↓
設定 selectTemplate = action2
    ↓
發送 stockUse.json 模板（提示輸入股票代號）
```

**對應程式碼：**

```65:79:index.js
    } else if (userTextValue === action2) {
      console.log("現在狀態：----進入股票");
      selectTemplate = action2; //儲存當前狀態在哪

      const stockBoard = JSON.parse(JSON.stringify(stockUse));

      console.log(stockBoard);

      const result = await event.reply({
        type: "flex",
        altText: "XXXX",
        contents: stockBoard,
      });

      return result;
```

### 步驟 3：使用者輸入股票代號

```
使用者輸入 "0056"
    ↓
LINE 發送 message 事件
event.message.text = "0056"
    ↓
程式判斷：userTextValue !== action1 且 !== action2
    ↓
進入 else 分支
    ↓
檢查 selectTemplate === action2（是）
    ↓
執行 commandStock("0056")
```

**對應程式碼：**

```80:89:index.js
    } else {
      if (selectTemplate === action1) {
        // TODO: 匯率查詢功能待實作
      } else if (selectTemplate === action2) {
        commandStock(userTextValue);

        console.log("使用者輸入的代號是", userTextValue);

      }
    }
```

---

## 實際範例

### 範例 1：完整股票查詢流程

```
1. 使用者加入 Bot
   → 收到主選單（cardOption.json）

2. 使用者點擊「查詢股票」
   → event.message.text = "查詢股票"
   → selectTemplate = "查詢股票"
   → 收到 stockUse.json（提示輸入股票代號）

3. 使用者輸入 "2330"
   → event.message.text = "2330"
   → selectTemplate === "查詢股票" ✓
   → 執行 commandStock("2330")
```

### 範例 2：如何查看 JSON 結構

在程式碼中加入以下 console.log：

```javascript
// 查看完整模板結構
console.log("完整模板：", template);

// 查看第一個按鈕的文字
console.log(
  "第一個按鈕：",
  template.contents[0].footer.contents[0].action.text
);

// 查看第二個按鈕的文字
console.log(
  "第二個按鈕：",
  template.contents[1].footer.contents[0].action.text
);

// 查看使用者輸入的文字
console.log("使用者輸入：", event.message.text);

// 查看目前狀態
console.log("目前狀態：", selectTemplate);
```

### 範例 3：除錯技巧

```javascript
bot.on("message", async (event) => {
  console.log("\n========== 訊息事件 ==========");
  console.log("使用者輸入：", event.message.text);

  const action1 = template.contents[0].footer.contents[0].action.text;
  const action2 = template.contents[1].footer.contents[0].action.text;

  console.log("action1（匯率）：", action1);
  console.log("action2（股票）：", action2);
  console.log("目前狀態 selectTemplate：", selectTemplate);
  console.log("是否等於 action1？", event.message.text === action1);
  console.log("是否等於 action2？", event.message.text === action2);
  console.log("================================\n");

  // ... 後續判斷邏輯
});
```

---

## 🔑 關鍵重點總結

1. **JSON 結構路徑**

   - `template.contents[0]` = 第一個卡片（匯率）
   - `template.contents[1]` = 第二個卡片（股票）
   - `footer.contents[0].action.text` = 按鈕點擊後發送的文字

2. **狀態管理機制**

   - `selectTemplate` 記錄使用者選擇的功能
   - 透過比對 `userTextValue` 與 `action1/action2` 來設定狀態
   - 後續輸入透過檢查 `selectTemplate` 來判斷要執行哪個功能

3. **判斷流程**

   - 先判斷是否為按鈕點擊（`=== action1` 或 `=== action2`）
   - 如果不是按鈕，再檢查 `selectTemplate` 狀態
   - 根據狀態執行對應的功能

4. **為什麼需要狀態管理？**
   - 因為「按鈕點擊」和「手動輸入」都會觸發 `message` 事件
   - 需要區分「使用者選擇功能」和「使用者輸入資料」兩種情況
   - `selectTemplate` 就是這個「記憶」機制

---

## 📝 補充說明

### 為什麼使用 `action1` 和 `action2`？

這是從 JSON 模板中提取的按鈕文字，用來比對使用者是否點擊了按鈕。

### 為什麼要設定 `selectTemplate`？

因為當使用者輸入股票代號（如 "0056"）時，`event.message.text` 不會等於 "查詢股票"，所以需要透過 `selectTemplate` 來「記住」使用者之前選擇了什麼功能。

### 如何新增新功能？

1. 在 `cardOption.json` 新增第三個 bubble
2. 提取 `action3 = template.contents[2].footer.contents[0].action.text`
3. 在判斷邏輯中加入 `else if (userTextValue === action3)`
4. 設定 `selectTemplate = action3`
5. 在 else 分支中加入 `else if (selectTemplate === action3)` 的處理邏輯

---

**最後更新：** 2025-01-XX
**維護者：** QuickStock-LINEBOT 開發團隊
