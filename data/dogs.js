/**
 * PawWalk 本地狗狗資料
 *
 * 欄位說明（媒合用）：
 * - id          唯一識別
 * - name        名字
 * - breed       品種
 * - age         年齡（歲）
 * - gender      性別：公 / 母
 * - size        體型：小型 / 中型 / 大型
 * - energy      活力：低 / 中 / 高（影響適合的遛狗員節奏）
 * - location    活動區域
 * - image       照片路徑
 * - tags        快速標籤（個性、喜好）
 * - bio         簡短介紹（首頁卡片用）
 * - temperament 性情說明
 * - walkNeed    散步需求（時長、頻率、偏好時段）
 * - notes       給遛狗員的注意事項
 * - featured    是否出現在首頁「今日可愛狗狗」
 */
window.DOGS = [
  {
    id: "lucky",
    name: "Lucky",
    breed: "黃金獵犬",
    age: 3,
    gender: "公",
    size: "大型",
    energy: "高",
    location: "大安區",
    image: "images/sample1.jpg",
    tags: ["愛玩球", "親人", "需長時間散步"],
    bio: "喜歡公園散步、愛玩球。",
    temperament: "溫和親人，見到人會搖尾巴打招呼。",
    walkNeed: {
      durationMin: 45,
      frequency: "每天 1–2 次",
      preferredTime: "傍晚"
    },
    notes: "力氣不小，建議有中大型犬經驗。",
    featured: true
  },
  {
    id: "cookie",
    name: "Cookie",
    breed: "柯基犬",
    age: 2,
    gender: "母",
    size: "小型",
    energy: "高",
    location: "信義區",
    image: "images/sample2.jpg",
    tags: ["愛慢跑", "零食控", "短腿爆發力"],
    bio: "喜歡慢跑和吃零食。",
    temperament: "活潑好奇，對其他狗友善。",
    walkNeed: {
      durationMin: 30,
      frequency: "每天 2 次",
      preferredTime: "早晨 / 傍晚"
    },
    notes: "散步途中不要給太多零食；注意勿讓牠過度奔跑膝蓋。",
    featured: true
  },
  {
    id: "mochi",
    name: "Mochi",
    breed: "柴犬",
    age: 4,
    gender: "公",
    size: "中型",
    energy: "中",
    location: "中山區",
    image: "images/sample3.jpg",
    tags: ["愛探索", "獨立", "需耐心"],
    bio: "喜歡探索新地方。",
    temperament: "聰明獨立，偶爾會固執。",
    walkNeed: {
      durationMin: 35,
      frequency: "每天 1–2 次",
      preferredTime: "下午"
    },
    notes: "嗅覺很強，喜歡到處聞；請用短牽繩在路口。",
    featured: true
  },
  {
    id: "bao",
    name: "Bao",
    breed: "法鬥",
    age: 5,
    gender: "公",
    size: "小型",
    energy: "低",
    location: "松山區",
    image: "images/sample1.jpg",
    tags: ["怕熱", "慢走", "愛睡覺"],
    bio: "散步節奏慢，喜歡陰涼小路。",
    temperament: "黏人、個性溫和。",
    walkNeed: {
      durationMin: 20,
      frequency: "每天 1–2 次",
      preferredTime: "清晨 / 晚上"
    },
    notes: "短鼻犬，天氣熱請縮短行程並避免奔跑。",
    featured: false
  },
  {
    id: "nana",
    name: "Nana",
    breed: "拉布拉多",
    age: 1,
    gender: "母",
    size: "大型",
    energy: "高",
    location: "內湖區",
    image: "images/sample2.jpg",
    tags: ["幼犬", "精力旺盛", "需訓練中"],
    bio: "幼犬精力滿滿，適合喜歡帶狗放電的人。",
    temperament: "開朗好動，仍在學習指令中。",
    walkNeed: {
      durationMin: 40,
      frequency: "每天 2 次",
      preferredTime: "早晨 / 傍晚"
    },
    notes: "會偶發性撲人，需遛狗員能溫柔引導。",
    featured: false
  },
  {
    id: "toto",
    name: "Toto",
    breed: "貴賓犬",
    age: 6,
    gender: "公",
    size: "小型",
    energy: "中",
    location: "士林區",
    image: "images/sample3.jpg",
    tags: ["怕生", "輕聲細語", "需安靜路線"],
    bio: "個性敏感，偏好安靜路線。",
    temperament: "對陌生人較害羞，熟了之後很黏。",
    walkNeed: {
      durationMin: 25,
      frequency: "每天 2 次",
      preferredTime: "上午"
    },
    notes: "請避免嘈雜工地與大型犬聚集處。",
    featured: false
  },
  {
    id: "mango",
    name: "Mango",
    breed: "米克斯",
    age: 3,
    gender: "母",
    size: "中型",
    energy: "中",
    location: "板橋區",
    image: "images/sample1.jpg",
    tags: ["友善", "適合新手", "公園散步"],
    bio: "好帶又親人，適合第一次當遛狗員的人。",
    temperament: "穩定友善，對環境適應快。",
    walkNeed: {
      durationMin: 35,
      frequency: "每天 1–2 次",
      preferredTime: "傍晚"
    },
    notes: "無特殊限制，記得帶水與拾便袋即可。",
    featured: false
  },
  {
    id: "kiki",
    name: "Kiki",
    breed: "邊境牧羊犬",
    age: 2,
    gender: "母",
    size: "中型",
    energy: "高",
    location: "新店區",
    image: "images/sample2.jpg",
    tags: ["高智力", "需大量運動", "愛玩飛盤"],
    bio: "運動需求高，適合長距離或有互動遊戲的散步。",
    temperament: "聰明專注，喜歡有任務的活動。",
    walkNeed: {
      durationMin: 60,
      frequency: "每天 2 次",
      preferredTime: "早晨 / 傍晚"
    },
    notes: "僅建議有經驗且能走較長距離的遛狗員。",
    featured: false
  },
  {
    id: "pudding",
    name: "Pudding",
    breed: "雪納瑞",
    age: 7,
    gender: "公",
    size: "小型",
    energy: "低",
    location: "中正區",
    image: "images/sample3.jpg",
    tags: ["熟齡", "慢速散步", "規律作息"],
    bio: "熟齡狗狗，偏好固定路線與慢速散步。",
    temperament: "沉穩安靜，偶爾對機車聲會緊張。",
    walkNeed: {
      durationMin: 20,
      frequency: "每天 2 次",
      preferredTime: "上午 / 晚餐後"
    },
    notes: "膝蓋較弱，請避免上下太多階梯。",
    featured: false
  }
];

window.DogData = {
  /** 示範狗狗 + 主人刊登 */
  all() {
    const userDogs = window.Listings ? window.Listings.all() : [];
    return window.DOGS.concat(userDogs);
  },
  featured(limit = 3) {
    return this.all().filter((d) => d.featured).slice(0, limit);
  },
  byId(id) {
    return this.all().find((d) => d.id === id) || null;
  }
};
