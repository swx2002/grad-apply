import styles from "./Loading.module.css";
const shimmerClass = "bg-gradient-to-r from-gray-200 via-gray-50 to-violet-200 animate-[shimmer_2s_infinite] bg-[length:200%_100%]";
export function Loading() {
  return (
    <div className="w-full h-full p-4 space-y-4 relative overflow-hidden">
      {/* 添加一个全局渐变遮罩 */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-white to-violet-100"></div>
      
      <div className="relative">  {/* 添加 relative 以确保内容在遮罩上层 */}
        {/* 顶部工具栏骨架 */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-8 h-8 bg-gray-200 rounded ${shimmerClass}`}></div>
            ))}
          </div>
          <div className="flex space-x-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className={`w-8 h-8 bg-gray-200 rounded-full ${shimmerClass}`}></div>
            ))}
          </div>
        </div>

        {/* 编辑器内容骨架 */}
        <div className="space-y-3 mt-4">
          <div className={`h-6 bg-gray-200 rounded ${shimmerClass}`}></div>
          
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className={`h-4 bg-gray-200 rounded w-full ${shimmerClass}`}></div>
              <div className={`h-4 bg-gray-200 rounded w-[95%] ${shimmerClass}`}></div>
              <div className={`h-4 bg-gray-200 rounded w-[90%] ${shimmerClass}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}