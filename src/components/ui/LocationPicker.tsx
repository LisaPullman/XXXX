import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface LocationData {
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

interface LocationPickerProps {
  label?: string;
  value?: LocationData | null;
  onChange: (location: LocationData) => void;
  className?: string;
  error?: string;
}

// 模拟城市数据 - 实际项目中应该从API获取
const CITIES_DATA: LocationData[] = [
  { city: '北京', province: '北京市', latitude: 39.9042, longitude: 116.4074 },
  { city: '上海', province: '上海市', latitude: 31.2304, longitude: 121.4737 },
  { city: '广州', province: '广东省', latitude: 23.1291, longitude: 113.2644 },
  { city: '深圳', province: '广东省', latitude: 22.5431, longitude: 114.0579 },
  { city: '杭州', province: '浙江省', latitude: 30.2741, longitude: 120.1551 },
  { city: '南京', province: '江苏省', latitude: 32.0603, longitude: 118.7969 },
  { city: '武汉', province: '湖北省', latitude: 30.5928, longitude: 114.3055 },
  { city: '成都', province: '四川省', latitude: 30.5728, longitude: 104.0668 },
  { city: '西安', province: '陕西省', latitude: 34.3416, longitude: 108.9398 },
  { city: '重庆', province: '重庆市', latitude: 29.5630, longitude: 106.5516 },
];

export const LocationPicker: React.FC<LocationPickerProps> = ({
  label,
  value,
  onChange,
  className,
  error
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<LocationData[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filtered = CITIES_DATA.filter(city =>
        city.city.includes(searchTerm) || city.province.includes(searchTerm)
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  const handleCitySelect = (city: LocationData) => {
    onChange(city);
    setSearchTerm(city.city);
    setShowDropdown(false);
  };

  const displayValue = value ? value.city : searchTerm;

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        type="text"
        value={displayValue}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        placeholder="请输入城市名称"
        className={cn(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
        )}
      />

      {showDropdown && filteredCities.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-primary-50"
              onClick={() => handleCitySelect(city)}
            >
              <div className="flex items-center">
                <span className="font-normal block truncate">
                  {city.city}
                </span>
                <span className="text-gray-500 ml-2 text-sm">
                  {city.province}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {value && (
        <p className="mt-1 text-xs text-gray-500">
          经纬度: {value.latitude.toFixed(4)}, {value.longitude.toFixed(4)}
        </p>
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
