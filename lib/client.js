window.__ModuleLoader__.load({
  id: "miran-fann-dsh",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/MiranPluginsTab.jsx
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// assets/logo.svg
var logo_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="420" height="420" viewBox="-13.7 -46.2 420 420">%0A<!-- SVG created with Arrow, by QuiverAI (https://quiver.ai) -->%0A  <defs>%0A    <path id="leftFrame" d="m195.4 98.7c-18.8-18.4-36.6-40-55.1-55.2-14.4-11.8-29.7-18.3-45.3-18.1-13.2-0.8-24.8 2-34.1 9.4-17.9 14-26.6 36.5-31.5 60.3-4.6 24.7-5.6 52.7-5.5 79.8l0.3 25.6c0.1 25.1 3.6 45.9 11.6 63.6 8.3 18.6 19 29.7 36.4 35.4 11 3.7 26.5 4 37.7 0.6 19.9-6.1 35.4-19.7 50.5-32.6l38.1-32.4-56.5 43.3c-7.3 5.6-14.9 9.3-22.2 6.6-9.4-3.4-15.9-13.6-20.7-23.4-8.4-17-10.7-36.9-11-55.6-0.6-27.2-0.3-50.7 0.4-74.1 0.5-22.1 1.6-38.7 7.8-51.6 6.3-13.2 16.9-24.8 30-25.7 12.1-1.2 23.3 7 37.1 19.6z"/>%0A    <path id="rightFrame" d="m195.4 98.7c14.9-12.3 29.9-28 44.9-43.6 19.6-20.4 39.6-31.9 63.3-29.7 17.6 0.6 29.8 8.4 40.3 21.7 11.9 15.5 19 36.6 22.2 61.2 2 14.8 2.7 28.8 2.6 44l-0.1 47.1c-0.1 23.2-3 42.8-11.1 62.2-7.6 18-19.2 32.9-37.1 38.2-16 5.1-33.3 2.1-46.5-4.5-22.1-11.1-46.8-33.4-75.4-60.2l42.6 37.2c10.8 9.3 19.1 14.5 27.3 12.7 10.7-1.9 20-17.6 25.8-30.9 8-18.4 9.4-38.6 9.6-60.4v-48c0-23-2.5-44-9.7-61.7-4.9-11.6-11.7-22.4-19.7-26.6-9.6-5.2-17.8 0.1-27 7.5-14.8 12.1-32.6 28.2-47.8 37.2z"/>%0A    <path id="ribbon" d="m88.5 131.9c0.5-22.1 1.6-38.7 7.8-51.6 6.3-13.2 16.9-24.8 30-25.7 12.1-1.2 23.3 7 37.1 19.6l32 24.5c30.2 30 64.8 66.7 108.2 109.1-0.9 17.6-2.7 30.9-9.4 46.3-5.8 13.3-15.1 29-25.8 30.9-8.2 1.8-16.5-3.4-27.3-12.7l-42.6-37.2c-36.8-32.9-76-70.8-110-103.2z"/>%0A    <path id="leftOpening" d="m88.5 131.9c34 32.4 73.2 70.3 110 103.2l-56.5 43.3c-7.3 5.6-14.9 9.3-22.2 6.6-9.4-3.4-15.9-13.6-20.7-23.4-8.4-17-10.7-36.9-11-55.6-0.6-27.2-0.3-50.7 0.4-74.1z"/>%0A    <path id="rightOpening" d="m195.4 98.7 4.2 3.4c15.2-9 33-25.1 47.8-37.2 9.2-7.4 17.4-12.7 27-7.5 8 4.2 14.8 15 19.7 26.6 7.2 17.7 9.7 38.7 9.7 61.7v48c-0.1 5-0.1 9.6-0.2 14.1-43.4-42.4-78-79.1-108.2-109.1z"/>%0A    <clipPath id="clipLeft">%0A      <use xlink:href="%23leftFrame"/>%0A    </clipPath>%0A    <clipPath id="clipRight">%0A      <use xlink:href="%23rightFrame"/>%0A    </clipPath>%0A    <clipPath id="clipRibbon">%0A      <use xlink:href="%23ribbon"/>%0A    </clipPath>%0A    <linearGradient id="leftPaint" x1="80" x2="89" y1="25" y2="302" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%2395bafe" offset="0"/>%0A      <stop stop-color="%239bbfff" offset=".19"/>%0A      <stop stop-color="%23a2c2fa" offset=".37"/>%0A      <stop stop-color="%23b1cdfe" offset=".55"/>%0A      <stop stop-color="%23b9d2fe" offset=".7"/>%0A      <stop stop-color="%23bed5fe" offset=".84"/>%0A      <stop stop-color="%23dce9ff" offset="1"/>%0A    </linearGradient>%0A    <linearGradient id="leftAcross" x1="24" x2="96" y1="170" y2="170" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%237996ca" stop-opacity=".26" offset="0"/>%0A      <stop stop-color="%23ffffff" stop-opacity=".21" offset=".08"/>%0A      <stop stop-color="%23ffffff" stop-opacity=".08" offset=".31"/>%0A      <stop stop-color="%239fb4d7" stop-opacity="0" offset=".63"/>%0A      <stop stop-color="%237086ae" stop-opacity=".16" offset=".9"/>%0A      <stop stop-color="%23d7dadf" stop-opacity="0" offset="1"/>%0A    </linearGradient>%0A    <radialGradient id="leftCrown" cx="0" cy="0" r="1" gradientTransform="translate(79 46) rotate(25) scale(42 20)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23eff5ff" stop-opacity=".48" offset="0"/>%0A      <stop stop-color="%23e2ecff" stop-opacity=".31" offset=".59"/>%0A      <stop stop-color="%23deeaff" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <radialGradient id="leftReflection" cx="0" cy="0" r="1" gradientTransform="translate(43 124) rotate(5) scale(14 86)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23f1f6ff" stop-opacity=".37" offset="0"/>%0A      <stop stop-color="%23ebf2ff" stop-opacity=".2" offset=".58"/>%0A      <stop stop-color="%23eaf1ff" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <radialGradient id="leftBlue" cx="0" cy="0" r="1" gradientTransform="translate(144 58) rotate(38) scale(47 24)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%236899f5" stop-opacity=".46" offset="0"/>%0A      <stop stop-color="%23699cfb" stop-opacity=".23" offset=".58"/>%0A      <stop stop-color="%236b9efd" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <radialGradient id="leftGold" cx="0" cy="0" r="1" gradientTransform="translate(107 288) rotate(-13) scale(70 51)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23eaf2ff" stop-opacity=".76" offset="0"/>%0A      <stop stop-color="%23dfeaff" stop-opacity=".46" offset=".55"/>%0A      <stop stop-color="%23dae7ff" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <linearGradient id="leftInnerShade" x1="89" x2="89" y1="53" y2="276" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23598ef2" stop-opacity=".46" offset="0"/>%0A      <stop stop-color="%236d99ec" stop-opacity=".47" offset=".35"/>%0A      <stop stop-color="%238699bd" stop-opacity=".21" offset=".66"/>%0A      <stop stop-color="%2390b7fd" stop-opacity=".34" offset="1"/>%0A    </linearGradient>%0A    <linearGradient id="rightPaint" x1="303" x2="328" y1="25" y2="303" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23eda0b9" offset="0"/>%0A      <stop stop-color="%23f7afc7" offset=".13"/>%0A      <stop stop-color="%23ee91b1" offset=".3"/>%0A      <stop stop-color="%23f088ad" offset=".43"/>%0A      <stop stop-color="%23ef91b2" offset=".55"/>%0A      <stop stop-color="%23f2a2bc" offset=".68"/>%0A      <stop stop-color="%23f4adc4" offset=".8"/>%0A      <stop stop-color="%23fec0d4" offset=".93"/>%0A      <stop stop-color="%23ffcddc" offset="1"/>%0A    </linearGradient>%0A    <linearGradient id="rightAcross" x1="301" x2="369" y1="160" y2="160" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23dd6694" stop-opacity=".25" offset="0"/>%0A      <stop stop-color="%23ed7ea7" stop-opacity=".11" offset=".22"/>%0A      <stop stop-color="%23fdf1f4" stop-opacity=".06" offset=".62"/>%0A      <stop stop-color="%23feeff4" stop-opacity=".22" offset=".9"/>%0A      <stop stop-color="%23df7b9f" stop-opacity=".3" offset="1"/>%0A    </linearGradient>%0A    <radialGradient id="rightCrown" cx="0" cy="0" r="1" gradientTransform="translate(307 46) rotate(15) scale(43 38)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23fcdee7" stop-opacity=".4" offset="0"/>%0A      <stop stop-color="%23fcd9e3" stop-opacity=".24" offset=".52"/>%0A      <stop stop-color="%23fcd2df" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <linearGradient id="rightInnerShade" x1="301" x2="301" y1="60" y2="284" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23e483a5" stop-opacity=".24" offset="0"/>%0A      <stop stop-color="%23dd6392" stop-opacity=".43" offset=".32"/>%0A      <stop stop-color="%23e26f9a" stop-opacity=".49" offset=".63"/>%0A      <stop stop-color="%23ec92b1" stop-opacity=".19" offset="1"/>%0A    </linearGradient>%0A    <linearGradient id="ribbonPaint" x1="90" x2="296" y1="99" y2="231" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23c4d9fe" offset="0"/>%0A      <stop stop-color="%23d3d3fe" offset=".24"/>%0A      <stop stop-color="%23e3c8fe" offset=".47"/>%0A      <stop stop-color="%23fdc7f8" offset=".7"/>%0A      <stop stop-color="%23ffcfde" offset="1"/>%0A    </linearGradient>%0A    <radialGradient id="ribbonSheen" cx="0" cy="0" r="1" gradientTransform="translate(137 96) rotate(43) scale(59 24)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23f5f9ff" stop-opacity=".75" offset="0"/>%0A      <stop stop-color="%23f0f5ff" stop-opacity=".55" offset=".47"/>%0A      <stop stop-color="%23edf3ff" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <radialGradient id="ribbonBlue" cx="0" cy="0" r="1" gradientTransform="translate(164 74) rotate(39) scale(43 19)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%2378a3f4" stop-opacity=".4" offset="0"/>%0A      <stop stop-color="%237da7f4" stop-opacity=".24" offset=".6"/>%0A      <stop stop-color="%238eb2f5" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <linearGradient id="leftTransmission" x1="108" x2="162" y1="149" y2="279" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23b5c7e8" stop-opacity=".46" offset="0"/>%0A      <stop stop-color="%23c0cce2" stop-opacity=".45" offset=".36"/>%0A      <stop stop-color="%23b3cefe" stop-opacity=".39" offset=".65"/>%0A      <stop stop-color="%23dce9ff" stop-opacity=".45" offset="1"/>%0A    </linearGradient>%0A    <radialGradient id="warmTransmission" cx="0" cy="0" r="1" gradientTransform="translate(92 244) scale(53 80)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23d2e2ff" stop-opacity=".5" offset="0"/>%0A      <stop stop-color="%23d8e6fe" stop-opacity=".31" offset=".59"/>%0A      <stop stop-color="%23e1ecff" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <linearGradient id="rightTransmission" x1="207" x2="309" y1="87" y2="163" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23eab2c4" stop-opacity=".7" offset="0"/>%0A      <stop stop-color="%23febad0" stop-opacity=".72" offset=".4"/>%0A      <stop stop-color="%23fec5d7" stop-opacity=".68" offset=".7"/>%0A      <stop stop-color="%23ffadc8" stop-opacity=".73" offset="1"/>%0A    </linearGradient>%0A    <radialGradient id="pinkTransmissionLight" cx="0" cy="0" r="1" gradientTransform="translate(266 106) rotate(-16) scale(34 56)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23fff4f7" stop-opacity=".38" offset="0"/>%0A      <stop stop-color="%23fff1f5" stop-opacity=".19" offset=".54"/>%0A      <stop stop-color="%23ffe9ef" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A    <linearGradient id="lowerLeftBevel" x1="121" x2="199" y1="288" y2="235" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23c8dbfe" stop-opacity=".76" offset="0"/>%0A      <stop stop-color="%23bcd4ff" stop-opacity=".68" offset=".56"/>%0A      <stop stop-color="%23c5d9fe" stop-opacity=".2" offset="1"/>%0A    </linearGradient>%0A    <linearGradient id="lowerRightBevel" x1="202" x2="270" y1="237" y2="287" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23f2aec4" stop-opacity=".13" offset="0"/>%0A      <stop stop-color="%23f19eba" stop-opacity=".39" offset=".55"/>%0A      <stop stop-color="%23f3aac2" stop-opacity=".72" offset="1"/>%0A    </linearGradient>%0A    <filter id="soft" x="-25%" y="-20%" width="150%" height="140%">%0A      <feGaussianBlur stdDeviation="1.7"/>%0A    </filter>%0A    <filter id="fineSoft" x="-15%" y="-15%" width="130%" height="130%">%0A      <feGaussianBlur stdDeviation=".55"/>%0A    </filter>%0A    <!-- Where the blue half meets the pink half the colours mix into violet -->%0A    <radialGradient id="mixBloom" cx="0" cy="0" r="1" gradientTransform="translate(197 167) rotate(43) scale(118 64)" gradientUnits="userSpaceOnUse">%0A      <stop stop-color="%23c8a1e6" stop-opacity=".8" offset="0"/>%0A      <stop stop-color="%23cfb1e7" stop-opacity=".42" offset=".5"/>%0A      <stop stop-color="%23d9c4e9" stop-opacity="0" offset="1"/>%0A    </radialGradient>%0A  </defs>%0A  <!-- Opaque base so the see-through openings look the same on any background -->%0A  <use fill="%23fff" xlink:href="%23leftOpening"/>%0A  <use fill="%23fff" xlink:href="%23rightOpening"/>%0A  <use fill="url(%23leftTransmission)" xlink:href="%23leftOpening"/>%0A  <use fill="url(%23warmTransmission)" xlink:href="%23leftOpening"/>%0A  <use fill="url(%23rightTransmission)" xlink:href="%23rightOpening"/>%0A  <use fill="url(%23pinkTransmissionLight)" xlink:href="%23rightOpening"/>%0A  <g clip-path="url(%23clipLeft)">%0A    <use fill="url(%23leftPaint)" xlink:href="%23leftFrame"/>%0A    <use fill="url(%23leftAcross)" xlink:href="%23leftFrame"/>%0A    <use fill="url(%23leftCrown)" xlink:href="%23leftFrame"/>%0A    <use fill="url(%23leftReflection)" xlink:href="%23leftFrame"/>%0A    <use fill="url(%23leftBlue)" xlink:href="%23leftFrame"/>%0A    <use fill="url(%23leftGold)" xlink:href="%23leftFrame"/>%0A    <path d="m191 97c-19-18-41-40-56-43-16-3-27 8-36 22-10 16-12 35-12.4 59v72c0.2 28 5.4 51 16.4 68" fill="none" filter="url(%23soft)" stroke="url(%23leftInnerShade)" stroke-width="4.3"/>%0A    <path d="m39 263c-9-21-11-45-11-71-1-34 0-64 3-91 3-28 13-53 30-66 12-9 28-10 41-8" fill="none" filter="url(%23soft)" stroke="%23f0f5ff" stroke-opacity=".19" stroke-width="4"/>%0A    <path d="m105 278c9 11 18 12 29 7 17-9 42-32 65-49" fill="none" filter="url(%23fineSoft)" stroke="url(%23lowerLeftBevel)" stroke-width="3.5"/>%0A  </g>%0A  <g clip-path="url(%23clipRibbon)">%0A    <use fill="url(%23ribbonPaint)" xlink:href="%23ribbon"/>%0A    <use fill="url(%23ribbonBlue)" xlink:href="%23ribbon"/>%0A    <use fill="url(%23ribbonSheen)" xlink:href="%23ribbon"/>%0A    <ellipse cx="197" cy="167" rx="160" ry="160" fill="url(%23mixBloom)"/>%0A    <path d="m198.5 235.1 42.6 37.2c10.8 9.3 19.1 14.5 27.3 12.7" fill="none" filter="url(%23soft)" stroke="url(%23lowerRightBevel)" stroke-width="3"/>%0A  </g>%0A  <g clip-path="url(%23clipRight)">%0A    <use fill="url(%23rightPaint)" xlink:href="%23rightFrame"/>%0A    <use fill="url(%23rightAcross)" xlink:href="%23rightFrame"/>%0A    <use fill="url(%23rightCrown)" xlink:href="%23rightFrame"/>%0A    <path d="m269 55c15 4 27 26 32 48 7 33 6 71 6 98 0 29-6 50-14 66-7 13-15 20-26 21" fill="none" filter="url(%23soft)" stroke="url(%23rightInnerShade)" stroke-width="5"/>%0A    <path d="m358.2 236.8c-3.4 22.2-16 44.3-34.9 54.8-6.5 3.7-12.6 5.7-16.5 6.1 14.5 1.3 30.3-10.8 39.7-25.8 7-11.1 10.3-21.5 11.7-35.1z" fill="%23fff3f7" fill-opacity=".43" filter="url(%23soft)"/>%0A  </g>%0A</svg>%0A';

// src/client/api.js
async function call(method, path, body) {
  const init = { method, headers: {} };
  if (method === "POST") {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body ?? {});
  }
  const response = await fetch(`/miran/api/${path}`, init);
  const text = await response.text();
  let parsed = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = { error: text.slice(0, 300) };
  }
  if (!response.ok) throw new Error(parsed && parsed.error || `HTTP ${response.status}`);
  return parsed;
}
var api = {
  /** @returns {Promise<any>} the full Miran status. */
  status: () => call("GET", "status"),
  /** @param {Record<string, unknown>} patch - engine preference fields. */
  prefs: (patch) => call("POST", "prefs", { patch }),
  /** @param {string} provider - provider id. @param {string} value - the key. */
  saveKey: (provider, value) => call("POST", "key", { provider, value }),
  /** @param {string} provider - provider id. */
  removeKey: (provider) => call("POST", "key/remove", { provider }),
  /** @param {string} provider - provider id. */
  testKey: (provider) => call("POST", "key/test", { provider }),
  signIn: () => call("POST", "signin"),
  signOut: () => call("POST", "signout"),
  updateNow: () => call("POST", "update"),
  downloadVoice: () => call("POST", "model/download"),
  cancelVoice: () => call("POST", "model/cancel"),
  /** @returns {Promise<{ url?: string, error?: string }>} the live viewer link. */
  viewer: () => call("POST", "viewer"),
  restart: () => call("POST", "restart")
};

// src/client/MiranSettings.jsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/styles.js
var import_react = require("react");
var CSS = `
.miran-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 4px 0 24px;
  font-size: 13px;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}
.miran-hero { display: flex; align-items: center; gap: 12px; }
.miran-mark { width: 40px; height: 40px; border-radius: 12px; flex: none; }
.miran-hero-copy { display: flex; flex-direction: column; min-width: 0; }
.miran-title { font-size: 15px; font-weight: 600; line-height: 22px; margin: 0; }
.miran-sub { color: var(--dsw-alias-label-tertiary); font-size: 12px; }
.miran-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-left: auto; justify-content: flex-end; }
.miran-card {
  border: 0.5px solid var(--dsw-alias-settings-card-stroke);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-settings-card-fill);
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.miran-card-head { display: flex; align-items: center; gap: 8px; }
.miran-card-title { font-size: 14px; font-weight: 500; }
.miran-card-copy { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-card-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 2px; }
.miran-group {
  border: 0.5px solid var(--dsw-alias-settings-card-stroke);
  border-radius: var(--dsw-radius-xl);
  background: var(--dsw-alias-settings-card-fill);
  overflow: hidden;
}
.miran-group-head { padding: 12px 16px 6px; display: flex; flex-direction: column; gap: 2px; }
.miran-group-title { font-size: 14px; font-weight: 500; }
.miran-group-desc { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 10px 16px;
  border-top: 0.5px solid var(--dsw-alias-border-l2);
}
.miran-row.stacked { grid-template-columns: minmax(0, 1fr); align-items: stretch; }
.miran-row-label { font-size: 13px; }
.miran-row-help { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 18px; margin-top: 1px; }
.miran-row-control { display: flex; align-items: center; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.miran-row.stacked .miran-row-control { justify-content: flex-start; }
.miran-control { width: 100%; }
.miran-input { width: 100%; }
.miran-input input { width: 100%; }
.miran-mono {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11.5px;
}
.miran-inline { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.miran-muted { color: var(--dsw-alias-label-tertiary); }
.miran-error {
  border: 0.5px solid var(--dsw-alias-border-l3);
  border-radius: var(--dsw-radius-md);
  padding: 8px 10px;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-state-business-primary);
}
.miran-note { color: var(--dsw-alias-label-tertiary); font-size: 11.5px; line-height: 17px; }
.miran-select {
  height: 32px;
  min-width: 132px;
  padding: 0 26px 0 10px;
  border-radius: var(--dsw-radius-md);
  border: 0.5px solid var(--dsw-alias-border-l3);
  background: var(--dsw-alias-settings-card-fill);
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  font-family: inherit;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--dsw-alias-label-tertiary) 50%), linear-gradient(135deg, var(--dsw-alias-label-tertiary) 50%, transparent 50%);
  background-position: calc(100% - 13px) 14px, calc(100% - 9px) 14px;
  background-size: 4px 4px, 4px 4px;
  background-repeat: no-repeat;
}
.miran-select:focus-visible { outline: var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color); outline-offset: 1px; }
.miran-key { display: flex; flex-direction: column; gap: 6px; padding: 12px 16px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.miran-key:first-of-type { border-top: none; }
.miran-key-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.miran-key-name { font-weight: 500; }
.miran-key-row { display: flex; align-items: center; gap: 8px; }
.miran-key-row .miran-input { flex: 1; }
.miran-key-note { color: var(--dsw-alias-label-tertiary); font-size: 11.5px; line-height: 17px; }
.miran-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 12px 16px 14px; border-top: 0.5px solid var(--dsw-alias-border-l2); }
.miran-banner { display: flex; flex-direction: column; gap: 6px; border-radius: var(--dsw-radius-xl); padding: 14px 16px; border: 0.5px solid var(--dsw-alias-border-l3); background: var(--dsw-alias-bg-skeleton); }
.miran-banner.signin { border-color: var(--dsw-alias-state-business-primary); }
.miran-banner-title { font-size: 13.5px; font-weight: 600; }
.miran-steps { margin: 0; padding-left: 18px; color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 19px; }
.miran-footer { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding-top: 2px; }
.miran-spin { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid var(--dsw-alias-border-l3); border-top-color: var(--dsw-alias-state-business-primary); animation: miran-spin 0.8s linear infinite; }
@keyframes miran-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .miran-spin { animation-duration: 2.4s; } }
.miran-tab { display: flex; flex-direction: column; gap: 12px; padding: 4px 0 16px; }
.miran-tab-row { display: flex; align-items: center; gap: 10px; }
`;
var ID = "miran-fann-styles";
function ensureStyles() {
  if (typeof document === "undefined") return () => {
  };
  const existing = document.getElementById(ID);
  if (existing) return () => {
  };
  const style = document.createElement("style");
  style.id = ID;
  style.textContent = CSS;
  document.head.append(style);
  return () => style.remove();
}
function useStyles() {
  (0, import_react.useEffect)(() => {
    const remove = ensureStyles();
    return remove;
  }, []);
}

// src/client/MiranSettings.jsx
var import_jsx_runtime = require("react/jsx-runtime");
var QUALITIES = [
  { value: "", label: "Per request (high)" },
  { value: "draft", label: "Draft" },
  { value: "standard", label: "Standard" },
  { value: "high", label: "High" },
  { value: "max", label: "Max (10-bit HEVC)" },
  { value: "master", label: "Master (ProRes)" }
];
function size(bytes) {
  if (!bytes) return "0 MB";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function useMiran() {
  const [status, setStatus] = (0, import_react2.useState)(null);
  const [loadError, setLoadError] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)("");
  const [actionError, setActionError] = (0, import_react2.useState)("");
  const alive = (0, import_react2.useRef)(true);
  const refresh = (0, import_react2.useCallback)(async () => {
    try {
      const next = await api.status();
      if (!alive.current) return;
      setStatus(next);
      setLoadError("");
    } catch (error) {
      if (!alive.current) return;
      setLoadError(error instanceof Error ? error.message : String(error));
    }
  }, []);
  (0, import_react2.useEffect)(() => {
    alive.current = true;
    void refresh();
    return () => {
      alive.current = false;
    };
  }, [refresh]);
  const signingIn = Boolean(status && status.account && status.account.signing_in);
  (0, import_react2.useEffect)(() => {
    if (!signingIn) return void 0;
    const timer = setInterval(() => {
      void refresh();
    }, 1500);
    return () => clearInterval(timer);
  }, [signingIn, refresh]);
  const run = (0, import_react2.useCallback)(async (label, work) => {
    setBusy(label);
    setActionError("");
    try {
      const next = await work();
      if (next && next.engine) setStatus(next);
      else await refresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy("");
    }
  }, [refresh]);
  return { status, loadError, busy, actionError, setActionError, run, refresh };
}
function Row({ label, help, children, stacked = false }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: stacked ? "miran-row stacked" : "miran-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-row-label", children: label }),
      help ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-row-help", children: help }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-row-control", children })
  ] });
}
function Group({ title, desc, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "miran-group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-group-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-group-title", children: title }),
      desc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-group-desc", children: desc }) : null
    ] }),
    children
  ] });
}
function State({ ok, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Pill, { active: ok, children });
}
function MiranSection() {
  useStyles();
  const { status, loadError, busy, actionError, run, refresh } = useMiran();
  if (!status) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-page", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-hero", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "miran-mark", src: logo_default, alt: "" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-hero-copy", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "miran-title", children: "Miran Fann" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-sub", children: "Motion graphics with a GPU engine on this Mac." })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-card-copy", children: loadError || "Reading the Miran engine\u2026" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-card-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", onClick: () => void refresh(), children: "Check again" }) })
      ] })
    ] });
  }
  const engine = status.engine ?? {};
  const account = status.account ?? {};
  const prefs = status.prefs ?? {};
  const keys = status.keys ?? [];
  const update = status.update ?? {};
  const feedback = status.feedback ?? {};
  const voice = status.voice ?? {};
  const spend = status.spend ?? {};
  const gpu = status.gpu;
  const savePrefs = (label, patch) => run(label, () => api.prefs(patch));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-page", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-hero", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "miran-mark", src: logo_default, alt: "" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-hero-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "miran-title", children: "Miran Fann" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-sub", children: "Motion graphics with a GPU engine on this Mac." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-pills", children: [
        engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: true, children: status.version ? `v${status.version}` : "engine found" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { children: "engine missing" }),
        gpu && gpu.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: gpu.status.startsWith("AVAILABLE"), children: gpu.status.startsWith("AVAILABLE") ? `GPU \xB7 ${gpu.engine ?? gpu.backend ?? gpu.adapter ?? "ready"}` : gpu.engine ? `GPU \xB7 ${gpu.engine} off` : "GPU off" }) : null,
        gpu && gpu.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: true, children: "CPU \xB7 Flint" }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: Boolean(account.signed_in), children: account.signed_in ? "signed in" : "sign-in needed" })
      ] })
    ] }),
    actionError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-error", children: actionError }) : null,
    !engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-banner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-banner-title", children: "Install the Miran engine" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card-copy", children: [
        "The plugin found no engine. Run this once in a terminal; it installs the engine to ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: "~/.miran/bin/miran" }),
        " and takes about a minute."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Input, { className: "miran-input miran-mono", readOnly: true, value: engine.setup ?? "npx miran-fann setup", onFocus: (event) => event.target.select(), "aria-label": "Setup command" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "primary", onClick: () => {
          void navigator.clipboard?.writeText(engine.setup ?? "npx miran-fann setup");
        }, children: "Copy" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", onClick: () => void refresh(), children: "Check again" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-note", children: [
        "Looking in ",
        engine.searched && engine.searched.length ? engine.searched.join(", ") : "PATH",
        ". A different location can be set as ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: "enginePath" }),
        " in this plugin's config."
      ] })
    ] }) : null,
    engine.found && engine.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-banner", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-banner-title", children: "The engine is installed but not answering" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-card-copy", children: engine.error }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-card-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", onClick: () => void refresh(), children: "Try again" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-note miran-mono", children: engine.path })
    ] }) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: account.signed_in ? "miran-banner" : "miran-banner signin", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-banner-title", children: account.signed_in ? "Signed in to Miran Fann" : "Miran Fann runs signed in" }),
      account.signed_in ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card-copy", children: [
          account.name ? `${account.name} \xB7 ${account.email}` : account.email,
          account.since ? ` \xB7 since ${new Date(account.since * 1e3).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" })}` : ""
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", disabled: busy === "signout", onClick: () => void run("signout", () => api.signOut()), children: "Sign out" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: "Signing out stops the agent from using Miran on this Mac." })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-card-copy", children: "Miran Fann asks the person to sign in once with Google before its tools run. The plugin shows that check as it is; it never skips or imitates it." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-card-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "primary", disabled: Boolean(busy) || account.signing_in, onClick: () => void run("signin", () => api.signIn()), children: account.signing_in ? "Waiting for your browser\u2026" : "Sign in with Google" }),
          account.signing_in ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-spin", "aria-label": "Waiting" }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: account.signing_in ? "Finish signing in at miranfann.com; this page updates on its own." : "A browser window opens at miranfann.com." })
        ] }),
        account.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-error", children: account.error }) : null
      ] })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Engine", desc: engine.found ? engine.path : "Not installed.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Version", help: "Installed engine build.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: status.version ?? "unknown" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: `GPU \xB7 ${gpu && gpu.engine || "Metal"}`, help: gpu && gpu.adapter ? gpu.adapter : "Miran renders on the GPU when one is available.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: gpu ? `${gpu.status ?? "unknown"}${gpu.backend ? ` \xB7 ${gpu.backend}` : ""}` : "reading\u2026" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "CPU \xB7 Flint", help: "Miran's own CPU renderer: it draws the same film when there is no GPU, or when a render asks for backend cpu.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: gpu ? gpu.flint ?? "available" : "reading\u2026" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Row,
        {
          label: "Workspace",
          help: "Folder Miran reads and writes. Empty uses the folder dsh started in; set it in this plugin's config to pin one.",
          stacked: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: status.config && status.config.workspace ? status.config.workspace : "dsh workspace" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Tools", help: "Lean lists about 30 tools and reaches the rest through scripts. This is the engine default, shared with the other Miran hosts.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "select",
        {
          className: "miran-select",
          value: prefs.tools ?? "",
          "aria-label": "Tool list",
          disabled: Boolean(busy),
          onChange: (event) => void savePrefs("tools", { tools: event.target.value || null }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "App default" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "full", children: "Full \xB7 every tool" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "lean", children: "Lean \xB7 scripts first" })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "dsh tools", help: status.tools && status.tools.mounted ? "dsh is connected to the engine and lists its tools." : status.tools && status.tools.error || "Not connected yet.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-inline", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: Boolean(status.tools && status.tools.mounted && !status.tools.error), children: status.tools && status.tools.mounted ? "connected" : "off" }),
        engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", disabled: busy === "restart", onClick: () => void run("restart", () => api.restart()), children: "Reconnect" }) : null
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { label: "Live viewer", help: "Start the engine's viewer so the button below can open it.", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives.Switch,
          {
            checked: Boolean(status.config && status.config.viewer),
            label: "Start the live viewer",
            disabled: true,
            onChange: () => {
            },
            title: "Set in this plugin's config (viewer) so the engine starts with it."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono", children: status.config ? `port ${status.config.viewerPort}` : "" })
      ] })
    ] }),
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Render defaults", desc: "Used when the agent's request does not say otherwise.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Export quality", help: "renderVideo without a quality.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "select",
        {
          className: "miran-select",
          value: prefs.default_quality ?? "",
          "aria-label": "Export quality",
          disabled: Boolean(busy),
          onChange: (event) => void savePrefs("quality", { default_quality: event.target.value || null }),
          children: QUALITIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: option.value, children: option.label }, option.value))
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "File size limit", help: "MB; exports aim under it. Empty means no limit.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          type: "number",
          min: "1",
          step: "1",
          placeholder: "no limit",
          defaultValue: prefs.default_max_mb ?? "",
          "aria-label": "File size limit in MB",
          onBlur: (event) => void savePrefs("mb", { default_max_mb: event.target.value === "" ? null : Number(event.target.value) })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Voice", help: "Voiceovers without a voice. e.g. kokoro:af_heart.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          placeholder: "kokoro:af_heart",
          defaultValue: prefs.default_voice ?? "",
          "aria-label": "Default voice",
          onBlur: (event) => void savePrefs("voice", { default_voice: event.target.value.trim() || null })
        }
      ) })
    ] }) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Group,
      {
        title: "API keys",
        desc: "Cloud voices and generated media need a key. Values are stored in DeepSeek Harness's credential store and in Miran's own key store, so every host agrees; this page never shows a stored key.",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: keys.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRow, { row: key, busy, run }, key.id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-note", style: { padding: "0 16px 12px" }, children: "An environment variable with the same name wins over both stores. Keys are billed to your own accounts." })
        ]
      }
    ) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Generation", desc: "Image and video models made in the cloud with your OpenRouter, fal or Replicate key. Miran checks the price first and refuses a call over these caps.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Image model", help: `Any OpenRouter image model id. Empty uses ${status.image_default ?? "the default"}.`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          placeholder: status.image_default ?? "",
          defaultValue: prefs.image_model ?? "",
          "aria-label": "Image model",
          onBlur: (event) => void savePrefs("image", { image_model: event.target.value.trim() || null })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Video model", help: `Any OpenRouter video model id. Empty uses ${status.video_default ?? "the default"}.`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          placeholder: status.video_default ?? "",
          defaultValue: prefs.video_model ?? "",
          "aria-label": "Video model",
          onBlur: (event) => void savePrefs("video", { video_model: event.target.value.trim() || null })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Draft model", help: `Cheap previews. Empty uses ${status.draft_default ?? "the default"}.`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          placeholder: status.draft_default ?? "",
          defaultValue: prefs.draft_video_model ?? "",
          "aria-label": "Draft video model",
          onBlur: (event) => void savePrefs("draft", { draft_video_model: event.target.value.trim() || null })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Most per call", help: `Dollars one generation may cost. Default $${spend.call_cap_default ?? 0}.`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          type: "number",
          min: "0",
          step: "0.5",
          placeholder: String(spend.call_cap_default ?? ""),
          defaultValue: prefs.spend_cap_call_usd ?? "",
          "aria-label": "Spend cap per call",
          onBlur: (event) => void savePrefs("cap", { spend_cap_call_usd: event.target.value === "" ? null : Number(event.target.value) })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Most per day", help: `Spent today $${(spend.today_usd ?? 0).toFixed(2)}, this month $${(spend.month_usd ?? 0).toFixed(2)}.`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          type: "number",
          min: "0",
          step: "0.5",
          placeholder: String(spend.day_cap_default ?? ""),
          defaultValue: prefs.spend_cap_day_usd ?? "",
          "aria-label": "Spend cap per day",
          onBlur: (event) => void savePrefs("daycap", { spend_cap_day_usd: event.target.value === "" ? null : Number(event.target.value) })
        }
      ) })
    ] }) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Voices", desc: "Kokoro, the built-in voice, runs on this Mac. Gemini and ElevenLabs voices go over the internet with your key.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Cloud voices", help: "When the agent may pick a cloud voice.", stacked: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.SegmentedControl,
        {
          id: "miran-cloud-voices",
          label: "Cloud voices",
          value: prefs.cloud_voices ?? "ask",
          disabled: Boolean(busy),
          options: [
            { value: "ask", label: "Only when I ask" },
            { value: "allowed", label: "Allowed" }
          ],
          onChange: (next) => void savePrefs("cloud", { cloud_voices: next })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Row,
        {
          label: "Built-in voice",
          help: voice.installed ? "Installed: 28 English voices, offline and free." : `One download of ${size(voice.total_bytes ?? 0)}; a cut connection continues where it stopped.`,
          children: voice.installed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: true, children: "installed" }) : voice.download && voice.download.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-inline", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-spin", "aria-label": "Downloading" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "miran-note", children: [
              size(voice.download.done ?? 0),
              " / ",
              size(voice.download.total ?? 0),
              voice.download.eta_s ? ` \xB7 ${Math.max(1, Math.round(voice.download.eta_s / 60))} min left` : ""
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", onClick: () => void run("cancel", () => api.cancelVoice()), children: "Cancel" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-inline", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", disabled: Boolean(busy), onClick: () => void run("download", () => api.downloadVoice()), children: "Download" }),
            voice.download && voice.download.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: voice.download.error }) : null
          ] })
        }
      )
    ] }) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Viewer", desc: "How new viewers open; each viewer still remembers your changes.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Theme", stacked: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.SegmentedControl,
        {
          id: "miran-viewer-theme",
          label: "Viewer theme",
          value: prefs.viewer && prefs.viewer.theme || "auto",
          disabled: Boolean(busy),
          options: [{ value: "auto", label: "Auto" }, { value: "dark", label: "Dark" }, { value: "light", label: "Light" }],
          onChange: (next) => void savePrefs("viewer-theme", { viewer: { theme: next } })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Time", stacked: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.SegmentedControl,
        {
          id: "miran-viewer-units",
          label: "Viewer time units",
          value: prefs.viewer && prefs.viewer.units || "tc",
          disabled: Boolean(busy),
          options: [{ value: "tc", label: "Timecode" }, { value: "frames", label: "Frames" }],
          onChange: (next) => void savePrefs("viewer-units", { viewer: { units: next } })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Preview", stacked: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.SegmentedControl,
        {
          id: "miran-viewer-preview",
          label: "Viewer preview quality",
          value: prefs.viewer && prefs.viewer.preview || "draft",
          disabled: Boolean(busy),
          options: [{ value: "draft", label: "Draft" }, { value: "full", label: "Full" }],
          onChange: (next) => void savePrefs("viewer-preview", { viewer: { preview: next } })
        }
      ) })
    ] }) : null,
    engine.found ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, { title: "Feedback and updates", desc: "Miran ships better when issues come back; nothing is sent unless sharing is on.", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Share feedback", help: feedback.decided_by === "MIRAN_FEEDBACK" || feedback.decided_by === "DO_NOT_TRACK" ? `Set by ${feedback.decided_by} in the environment.` : "The agent\u2019s short issue reports go to the Miran team.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Switch,
        {
          checked: Boolean(feedback.share),
          label: "Share feedback",
          disabled: Boolean(busy) || feedback.decided_by === "MIRAN_FEEDBACK" || feedback.decided_by === "DO_NOT_TRACK",
          onChange: (next) => void savePrefs("feedback", { share_feedback: next })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { label: "Update automatically", help: update.npm_install ? "Checks npm every few hours; the next session uses a new version." : "This is a developer build: it does not update itself.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Switch,
        {
          checked: Boolean(update.auto),
          label: "Update automatically",
          disabled: Boolean(busy) || !update.npm_install || update.decided_by === "MIRAN_AUTO_UPDATE",
          onChange: (next) => void savePrefs("update", { auto_update: next })
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Row,
        {
          label: "Version",
          help: `Installed ${update.installed ?? status.version ?? "unknown"}${update.latest ? ` \xB7 latest on npm ${update.latest}` : ""}${update.error ? ` \xB7 ${update.error}` : ""}`,
          children: update.npm_install ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", disabled: Boolean(busy), onClick: () => void run("update-now", () => api.updateNow()), children: "Update now" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: "no self-update" })
        }
      )
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, { title: "Skills", desc: "Loaded from this plugin and offered to the agent by name, so /miran-\u2026 and model-side loading use the same files.", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-chips", children: status.harness && status.harness.skills && status.harness.skills.length > 0 ? status.harness.skills.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Pill, { children: name }, name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: "No skills found under plugin-deepseek/skills yet." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-footer", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Button,
        {
          size: "sm",
          variant: "primary",
          disabled: !engine.found || busy === "viewer",
          onClick: () => void run("viewer", async () => {
            const result = await api.viewer();
            if (result && result.url) window.open(result.url, "_blank", "noopener");
            else if (result && result.error) throw new Error(result.error);
          }),
          children: "Open live viewer"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Button, { size: "sm", variant: "outline", disabled: !engine.found, onClick: () => window.open("/miran/settings", "_blank", "noopener"), children: "Miran's own settings" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-note", children: "Both open on this computer only." })
    ] })
  ] });
}
function KeyRow({ row, busy, run }) {
  const [value, setValue] = (0, import_react2.useState)("");
  const [test, setTest] = (0, import_react2.useState)(null);
  const set = row.harness && row.harness.configured ? "harness" : row.set ? "engine" : "none";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-key", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-key-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-key-name", children: row.name }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(State, { ok: set !== "none", children: set === "none" ? "not set" : set === "harness" ? "set in dsh" : "set in Miran" }),
      row.set && row.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "miran-mono miran-muted", children: row.hint }) : null,
      row.source === "environment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Pill, { children: `from ${row.env}` }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-key-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Input,
        {
          className: "miran-input miran-mono",
          type: "password",
          autoComplete: "off",
          spellCheck: "false",
          "aria-label": `${row.name} API key`,
          placeholder: set === "none" ? `Paste your ${row.name} key` : "Replace the key\u2026",
          value,
          onChange: (event) => setValue(event.target.value),
          onKeyDown: (event) => {
            if (event.key === "Enter" && value.trim()) {
              void run(`key:${row.id}`, async () => {
                const next = await api.saveKey(row.id, value.trim());
                setValue("");
                return next;
              });
            }
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Button,
        {
          size: "sm",
          variant: "primary",
          disabled: Boolean(busy) || !value.trim(),
          onClick: () => void run(`key:${row.id}`, async () => {
            const next = await api.saveKey(row.id, value.trim());
            setValue("");
            return next;
          }),
          children: "Save"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Button,
        {
          size: "sm",
          variant: "ghost",
          disabled: Boolean(busy) || set === "none",
          onClick: () => void run(`test:${row.id}`, async () => {
            const result = await api.testKey(row.id);
            setTest(result);
          }),
          children: "Test"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dsh_client_ui_primitives.Button,
        {
          size: "sm",
          variant: "ghost",
          disabled: Boolean(busy) || set === "none" && !row.set,
          title: "Forget this key in both stores",
          onClick: () => void run(`remove:${row.id}`, () => api.removeKey(row.id)),
          children: "Remove"
        }
      )
    ] }),
    test ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "miran-key-note", children: test.busy ? "Checking the key\u2026" : test.ok ? `Works${test.models && test.models.length ? ` \xB7 ${test.models.length} models listed` : ""}${test.image_model ? ` \xB7 images use ${test.image_model}` : ""}` : test.message || "The key did not work." }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "miran-key-note", children: [
      row.env,
      row.harness && row.harness.writable ? "" : " \xB7 the dsh credential store is read-only here, so only Miran keeps it"
    ] })
  ] });
}

// src/client/MiranPluginsTab.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function MiranPluginsTab() {
  useStyles();
  const { status, loadError, busy, actionError, run } = useMiran();
  if (!status) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-tab", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-tab-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: "miran-mark", src: logo_default, alt: "" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-title", children: "Miran Fann" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-sub", children: loadError || "Reading the Miran engine\u2026" })
      ] })
    ] }) });
  }
  const engine = status.engine ?? {};
  const account = status.account ?? {};
  const gpu = status.gpu;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-tab", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-tab-row", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { className: "miran-mark", src: logo_default, alt: "" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", minWidth: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-title", children: "Miran Fann" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-sub", children: "GPU motion graphics on this Mac, as dsh tools and skills." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-pills", children: [
        engine.found ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Pill, { active: true, children: status.version ? `v${status.version}` : "engine found" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Pill, { children: "engine missing" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Pill, { active: Boolean(account.signed_in), children: account.signed_in ? "signed in" : "sign-in needed" })
      ] })
    ] }),
    actionError ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-error", children: actionError }) : null,
    !engine.found ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-card-title", children: "Install the engine" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-card-copy", children: [
        "Run ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "miran-mono", children: engine.setup ?? "npx miran-fann setup" }),
        " once in a terminal, then reopen this tab."
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-card-copy", children: engine.error ? engine.error : `${gpu && gpu.status ? `GPU \xB7 ${gpu.engine ?? gpu.backend ?? "GPU"}: ${gpu.status.startsWith("AVAILABLE") ? "available" : "off"} \xB7 CPU \xB7 Flint: ${gpu.flint ?? "available"}` : "Engines: reading\u2026"} \xB7 ${status.tools && status.tools.mounted ? "tools connected" : "tools off"}` }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "miran-card-actions", children: [
        account.signed_in ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Button, { size: "sm", variant: "outline", disabled: Boolean(busy), onClick: () => void run("signout", () => api.signOut()), children: "Sign out" }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_dsh_client_ui_primitives2.Button, { size: "sm", variant: "primary", disabled: Boolean(busy) || account.signing_in, onClick: () => void run("signin", () => api.signIn()), children: account.signing_in ? "Waiting for your browser\u2026" : "Sign in with Google" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_dsh_client_ui_primitives2.Button,
          {
            size: "sm",
            variant: "outline",
            disabled: Boolean(busy) || !engine.found,
            onClick: () => void run("viewer", async () => {
              const result = await api.viewer();
              if (result && result.url) window.open(result.url, "_blank", "noopener");
              else if (result && result.error) throw new Error(result.error);
            }),
            children: "Open live viewer"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-note", children: account.signed_in ? `${account.name ? `${account.name} \xB7 ` : ""}${account.email ?? ""}` : "Miran Fann asks each person to sign in once with Google; this plugin shows that check and never bypasses it." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "miran-note", children: "API keys, render defaults, voices and updates live in Settings \u2192 Miran." })
  ] });
}

// src/client/index.jsx
var inject = ["slots"];
function apply(ctx) {
  ctx.effect(() => ensureStyles(), "miran: styles");
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "miran",
    order: 16,
    label: "Miran"
  }, MiranSection));
  ctx.slots.inject("settings.plugins.tab", () => ctx.slots.register({
    name: "settings.plugins.tab",
    // The tab only shows inside this plugin's own row, which dsh addresses by
    // the Loader entry id from cordis.patch.yml, not by package name.
    id: "miran-fann",
    order: 16,
    label: "Miran"
  }, MiranPluginsTab));
}

    return module.exports;
  },
});

