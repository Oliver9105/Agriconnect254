import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CloudRain, Wind, Thermometer, Calendar, Sun, Cloud, CloudLightning } from 'lucide-react';
import { cn } from '../lib/utils';

interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipProb: number;
  windSpeed: number;
  weatherCode: number;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return <Sun className="w-5 h-5 text-amber-400" />;
  if (code <= 3) return <Cloud className="w-5 h-5 text-zinc-400" />;
  if (code >= 51 && code <= 67) return <CloudRain className="w-5 h-5 text-blue-400" />;
  if (code >= 95) return <CloudLightning className="w-5 h-5 text-purple-400" />;
  return <Cloud className="w-5 h-5 text-zinc-400" />;
};

const getDayName = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
};

export const WeatherForecast = () => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    // Mock historical data
    setHistoricalData([
      { date: '2026-03-20', temp: 22 },
      { date: '2026-03-21', temp: 23 },
      { date: '2026-03-22', temp: 21 },
    ]);
    
    // Mock crop alerts
    setAlerts(['Frost warning for Tea crops', 'High humidity alert for Maize']);

    const fetchWeather = async () => {
      try {
        // Kericho Coordinates: -0.3689, 35.2863
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-0.3689&longitude=35.2863&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=Africa%2FNairobi'
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        const daily = data.daily;
        
        const formattedForecast: DailyForecast[] = daily.time.map((time: string, i: number) => ({
          date: time,
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          precipProb: daily.precipitation_probability_max[i],
          windSpeed: Math.round(daily.windspeed_10m_max[i]),
          weatherCode: daily.weathercode[i],
        }));
        
        setForecast(formattedForecast);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full flex items-center justify-center shadow-neumorphic">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-glow-emerald" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 h-full flex items-center justify-center text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-neumorphic">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-5 sm:p-10 h-full shadow-neumorphic overflow-hidden relative hover:border-emerald-500/30 transition-all duration-700 group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-emerald-500/10 transition-all duration-1000" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-950 rounded-2xl shadow-tactile group-hover:shadow-glow-emerald transition-all duration-700 border border-white/5">
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-base font-black text-white tracking-tighter leading-none">Kericho Forecast</h3>
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] mt-1 opacity-80">Next 7 Days • Highlands</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 relative z-10">
        {forecast.map((day, i) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group/item flex items-center justify-between p-3 sm:p-5 bg-slate-950/30 border border-white/5 rounded-2xl hover:bg-slate-950/50 hover:border-emerald-500/20 transition-all cursor-default shadow-neumorphic-inset-sm"
          >
            <div className="flex items-center gap-3 w-16">
              <span className="text-[10px] font-black text-slate-600 tracking-[0.1em] group-hover/item:text-slate-400 transition-colors">{i === 0 ? 'TOD' : getDayName(day.date).toUpperCase()}</span>
            </div>
            <div className="flex-none">{getWeatherIcon(day.weatherCode)}</div>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="text-sm font-black text-white tracking-tighter">{day.maxTemp}°</span>
              <span className="text-xs font-black text-slate-700">{day.minTemp}°</span>
              <div className="flex items-center gap-1 ml-2">
                <CloudRain className="w-3 h-3 text-blue-500/50" />
                <span className="text-[10px] font-black text-slate-600 font-mono">{day.precipProb}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
