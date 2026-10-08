# 珍 · 惜菌瓶 (BioCherish)

> 結合 IoT 與 AI 的智慧甲蟲養育監測 App：遠端監測菌瓶外觀與溫濕度，一有異常就推播通知。

## 背景與動機

許多甲蟲飼育者會用瓶裝菌菇（菌瓶）來養幼蟲。菌瓶保存條件嚴格，溫度太高或太低都不行；菌菇一旦變黃、變黑或發霉，也要立刻更換，不然會影響甲蟲。飼育者常常人不在溫控室旁邊，例如人在雲林、菌瓶卻放在高雄，沒辦法隨時查看。

本系統讓邊緣裝置定時拍攝菌瓶、量測溫濕度並上傳到雲端，再由 AI 模型判斷有沒有異常。發現異常時會推播通知並附上建議處置方式，同時保留歷史紀錄，作為日後改善養育環境的依據。

## 主要功能

- **帳號系統**：Email／密碼註冊與登入、Google OAuth 登入，以及個人檔案設定
- **邊緣裝置管理**：一個帳號可以匯入並管理多台裝置（多個菌瓶）
- **裝置匯入導覽**：建立裝置後，可下載專屬韌體（`.bin`）與資源壓縮檔（`.zip`），並測試裝置連線
- **菌瓶偵測**：裝置定時（頻率可自訂）或手動觸發拍攝，上傳照片與溫濕度，由 AI 判斷菌瓶外觀和環境是否異常
- **狀態總覽與歷史紀錄**：查看各菌瓶的大致狀態、最近一次拍攝結果，並可依時間區間查詢歷史紀錄
- **手動上傳**：在 Uploads 分頁直接上傳照片（可附溫度、濕度）送去辨識
- **深色模式**：跟隨系統的淺色／深色主題

## 系統架構

```
┌─────────────┐   MQTT    ┌──────────────── AWS ────────────────┐
│  ESP32-CAM  │ ────────► │ IoT Core ─► Lambda ─► DynamoDB / S3 │
│ (邊緣裝置)   │ ◄──────── │      ▲           ▲                  │
└─────────────┘           │ EventBridge   API Gateway           │
                          └──────────────────┬──────────────────┘
                                             │ HTTPS (REST)
                                     ┌───────┴───────┐
                                     │  BioCherish   │
                                     │ App (本 repo) │
                                     └───────────────┘
```

| 元件 | 用途 |
| --- | --- |
| **App（本 repo）** | React Native + Expo + NativeWind (Tailwind CSS)，支援 Android／iOS／Web |
| **S3** | 儲存上傳的照片，以及 AI 標示異常位置的照片 |
| **DynamoDB** | 資料庫 |
| **IoT Core** | MQTT Server，負責與邊緣裝置溝通 |
| **Lambda** | 處理 request 與業務邏輯 |
| **API Gateway** | 開放 API 端點、驗證 request 並轉發給 Lambda |
| **EventBridge** | 定時觸發 Lambda，讓邊緣裝置進行偵測 |
| **CloudWatch** | 檢視服務運行 Log |

### 主要資料表

- **DeviceSet**：使用者建立的虛擬邊緣裝置組合。要先完成匯入導覽、確認伺服器能連上裝置後才能使用。
- **DetectRecord**：偵測紀錄，內容包含拍攝圖片、溫度、濕度、AI 標示異常處的照片，以及紀錄狀態和錯誤資訊。
- **DetectRecordState**：偵測狀態，包含是否異常、狀態名稱與建議處置方式。

## 技術棧

- [Expo SDK 54](https://docs.expo.dev/) / React Native 0.81 / React 19
- [Expo Router](https://docs.expo.dev/router/introduction/)（檔案式路由、typed routes、原生 Tabs）
- [NativeWind](https://www.nativewind.dev/) + Tailwind CSS 3
- axios（含 401 自動 refresh token 的攔截器）
- expo-secure-store（原生端存 token；Web 端改用 `localStorage`）
- expo-web-browser / expo-linking（Google OAuth 回呼，scheme 為 `biocherish://`）
- Lottie（載入動畫）、react-native-reanimated

## 專案結構

```
app/
├── _layout.tsx              # 根 layout：Theme / SafeArea / Auth Provider，依登入狀態切換畫面
├── SignIn.tsx               # 登入（帳密 / Google）
├── SignUp.tsx               # 註冊
├── SignInSuccess.tsx        # Google OAuth 回呼頁
├── LoadingPage.tsx
└── (tabs)/
    ├── home/
    │   ├── index.tsx        # 菌瓶裝置列表與大致狀態
    │   ├── newEdge/         # 建立裝置 → 下載韌體 → 測試連線
    │   └── [id]/
    │       ├── index.tsx    # 最近一次拍攝 / 歷史紀錄 / 裝置設定
    │       └── history/[detect_record_id].tsx  # 單筆偵測紀錄
    ├── uploads/index.tsx    # 手動上傳照片辨識
    └── settings/            # 設定選項、個人檔案、通知設定
components/
├── providers/               # AuthProvider、ThemeProvider、RefreshProvider
├── DisplayUpload.tsx        # 偵測結果顯示
├── HistoryTable.tsx         # 歷史紀錄表格
└── ...                      # Card、InputsBox、SelectBar、Main、Section 等 UI 元件
constants/theme.ts           # 色彩與狀態顏色
lib/time.ts                  # 日期格式化
animations/                  # Lottie 動畫
```

## 開始使用

### 環境需求

- Node.js（建議 LTS 版本）
- Android Studio（Android）或 Xcode（iOS），也可以先用 Web 版開發

### 安裝

```bash
npm install
```

### 環境變數

在專案根目錄建立 `.env`：

```env
# 原生端 (Android / iOS) 使用的後端 API 位址
EXPO_PUBLIC_API_URL=https://<your-api-gateway-url>
# Web 端使用的後端 API 位址
EXPO_PUBLIC_WEB_API_URL=https://<your-api-gateway-url>
```

### 啟動

```bash
npm start          # 啟動 Expo dev server
npm run android    # 建置並在 Android 執行
npm run ios        # 建置並在 iOS 執行
npm run web        # 在瀏覽器執行
```

### 程式碼風格

```bash
npm run lint       # ESLint + Prettier 檢查
npm run format     # 自動修正
```

## 後端 API 一覽

App 呼叫的 REST 端點（皆以 `EXPO_PUBLIC_API_URL` 為前綴，登入後會帶 `Authorization: Bearer <access_token>`）：

| 方法 | 路徑 | 說明 |
| --- | --- | --- |
| POST | `/auth/register` | 註冊 |
| POST | `/auth/login` | 登入，取得 access / refresh token |
| GET | `/auth/google/login?app_redirect_url=` | 取得 Google OAuth 登入網址 |
| POST | `/auth/refresh` | 換發 token |
| POST | `/auth/logout` | 登出 |
| GET | `/auth/userinfo` | 取得個人資料 |
| POST | `/auth/updateinfo` | 更新個人資料 |
| GET | `/bottle/` | 菌瓶列表 |
| GET | `/bottle/{id}` | 最近一次偵測結果 |
| GET | `/bottle/{id}/total` | 偵測紀錄總數 |
| GET | `/bottle/{id}/history?s=&e=` | 指定區間的歷史紀錄 |
| GET | `/bottle/{id}/history/{detect_record_id}` | 單筆偵測紀錄 |
| DELETE | `/bottle/{id}` | 刪除菌瓶 |
| POST | `/device/newDevice` | 建立裝置（名稱、Wi-Fi、拍攝頻率） |
| POST | `/device/getDevice` | 由 bottle_id 取得裝置設定 |
| PUT | `/device/updateDevice` | 更新裝置名稱與拍攝頻率 |
| GET | `/device/{deviceId}/bin` | 下載裝置韌體 |
| GET | `/device/{deviceId}/zip` | 下載裝置資源壓縮檔 |
| GET | `/device/{deviceId}/connect` | 測試裝置連線 |
| POST | `/device/manualScan` | 手動觸發裝置拍攝 |
| POST | `/device/manualUpdate` | 手動上傳照片與溫濕度（multipart） |

## 邊緣裝置設定流程

1. 在 App 的 Home 分頁新增裝置，填入裝置名稱、Wi-Fi 名稱／密碼與拍攝頻率。
2. 下載 **BIN 韌體檔**，用 [ESPHome Web](https://web.esphome.io/) 燒錄到 ESP32-CAM。
3. 下載 **資源壓縮檔**，解壓縮後用 Arduino IDE 燒入 ESP32。
4. 調整鏡頭角度，讓菌瓶完整入鏡。
5. 回到 App 按「測試裝置連線狀態」，連線成功後就會開始定時偵測。

## 目前限制

- 邊緣裝置目前只支援 **ESP32-CAM**。
- 邊緣裝置匯入導覽還沒完成，目前邊緣裝置只能用來上傳照片。
- 裝置擺放位置不正確時，上傳的資料可能不合法，異常偵測的效果會下降。
- 通知設定頁還在開發中。

## 未來展望

- 支援更多種類的邊緣裝置。
- 用其他 AI 模型降低裝置擺放的限制，確保上傳資料合法、辨識準確。
- 補齊直觀的裝置匯入導覽，讓不熟悉邊緣裝置的使用者也能快速上手。
- 串接風扇、加濕器、溫控設備等智慧裝置，偵測到溫濕度異常時直接自動調整，實現真正的智慧養育。
