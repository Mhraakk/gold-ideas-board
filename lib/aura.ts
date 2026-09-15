const BASE =
  "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets";

export function aura(id: string): string {
  return `${BASE}/${id}`;
}

export const SHOTS = {
  darkWave: aura("fa51902b-c2a4-4c33-a96e-a8f1ef67edc6_1600w.jpg"),
  duskWave: aura("e534354d-c5f2-4399-a1d9-2f50338e8c47_1600w.jpg"),
  orangeWave: aura("d14dc069-558a-4c51-8aad-5cc237f9b61d_1600w.jpg"),
  hills: aura("4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg"),
  pyramid: aura("724142aa-44a6-48d3-9cf3-761e00d05b78_1600w.jpg"),
  villa: aura("005600e5-f6ab-4e59-bc86-eaeb02797dfa_1600w.jpg"),
  ringCity: aura("5ee0a38a-b5d3-4531-8793-98beed4af162_1600w.jpg"),
  fjord: aura("7f78131e-65e9-49b2-aa1f-ccc33e28df9f_1600w.webp"),
  tinyHouse: aura("fb6415fd-bf4d-4ccf-8e9d-7ab445e99207_1600w.jpg"),
  portraitA: aura("0d868fef-f560-45ca-ab35-5dad4fc29059_1600w.webp"),
  portraitB: aura("3186f9ea-5f5a-49f7-8fcf-568ad52f515e_1600w.webp"),
  portraitC: aura("65695f80-23f9-46ee-8487-cbb6c93cc48b_1600w.webp"),
} as const;

export const SHOT_LIST = Object.values(SHOTS);
