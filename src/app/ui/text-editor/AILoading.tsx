import styles from './Loading.module.css';

export function AILoading() {
  return (
    <div className="space-y-4 p-4">
      {/* 模拟多个评论的加载状态 */}
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className="rounded-lg border p-4 space-y-2"
        >
          {/* 模拟评论文本 */}
          <div className={`h-4 w-3/4 rounded ${styles.shimmer}`} />
          <div className={`h-4 w-1/2 rounded ${styles.shimmer}`} />
          
          {/* 模拟评论类型标签 */}
          <div className={`h-3 w-16 rounded mt-3 ${styles.shimmer}`} />
        </div>
      ))}
    </div>
  );
} 