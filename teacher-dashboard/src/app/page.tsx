import { Calendar } from "@/components/ui/calendar";

async function getWeatherData() {
  const lat = 35.33;
  const lon = 136.87;
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Asia%2FTokyo`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const weatherData = await getWeatherData();
  const currentTemp = weatherData?.current_weather?.temperature;
  const weatherCode = weatherData?.current_weather?.weathercode;

  let weatherText = "取得中...";
  let weatherIcon = "☁️";

  if (weatherCode !== undefined) {
    if (weatherCode <= 3) { weatherText = "晴れ / 曇り"; weatherIcon = "🌤️"; }
    else if (weatherCode <= 69) { weatherText = "雨模様"; weatherIcon = "☔"; }
    else if (weatherCode <= 79) { weatherText = "雪"; weatherIcon = "⛄"; }
    else { weatherText = "荒天"; weatherIcon = "🌀"; }
  }

  const now = new Date();
  const formatterMonthDay = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", month: "long" });
  const formatterWeekday = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", weekday: "long" });
  const formatterDayNum = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", day: "numeric" });

  const currentMonth = formatterMonthDay.format(now);
  const currentWeekday = formatterWeekday.format(now);
  const currentDayNum = formatterDayNum.format(now).replace("日", "");

  return (
    <div className="pb-10">
      <h2 className="text-3xl font-extrabold mb-8 text-slate-800 tracking-tight drop-shadow-sm">
        Overview
      </h2>

      {/* 💡「md:」を完全に削除し、どんなに画面が狭くても常に「横並び（7:3）」に固定 */}
      <div className="grid grid-cols-10 gap-6 items-stretch">
        
        {/* ─── 左側：カレンダーウィジェット（常時 7割の幅） ─── */}
        <div className="col-span-7 bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 flex flex-col lg:flex-row gap-6 items-center justify-around overflow-hidden">
          
          {/* 今日の「大きな日付」 */}
          <div className="flex flex-col items-center lg:items-start justify-center min-w-[100px]">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Today</span>
            <p className="text-5xl font-black text-slate-800 tracking-tighter my-0.5">{currentDayNum}</p>
            <p className="text-sm font-bold text-slate-600 truncate">{currentMonth} {currentWeekday}</p>
          </div>

          {/* カレンダー本体（狭い画面でもはみ出さないように少しだけ縮小表示する魔法をかけています） */}
          <div className="bg-white/50 p-2 rounded-2xl border border-white/60 shadow-sm max-w-full flex justify-center items-center scale-95 origin-center">
            <Calendar className="bg-transparent" />
          </div>
          
        </div>

        {/* ─── 右側：お天気ウィジェット（常時 3割の幅） ─── */}
        <div className="col-span-3 bg-white/60 backdrop-blur-lg p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 flex flex-col justify-between min-h-[220px]">
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">Konan, Aichi</h3>
            <p className="text-4xl font-bold text-slate-700 tracking-tighter mt-2">
              {currentTemp}<span className="text-2xl text-slate-400 font-light">°</span>
            </p>
          </div>
          
          {/* 横幅が狭いときはアイコンと文字を縦並びにして、はみ出しを防ぐ */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mt-4">
            <p className="text-xs text-slate-500 font-semibold truncate">{weatherText}</p>
            <span className="text-5xl drop-shadow-md leading-none mb-1">{weatherIcon}</span>
          </div>
        </div>

      </div>
    </div>
  );
}