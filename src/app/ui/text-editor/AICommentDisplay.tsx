"use client";

interface Comment {
  sentence: string;
  comment: string;
  type: "suggestion" | "praise" | "correction";
  position?: {
    from: number;
    to: number;
  };
}

interface AICommentDisplayProps {
  comments: Comment[];
}

export function AICommentDisplay({ comments }: AICommentDisplayProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "suggestion": return "bg-blue-100 border-blue-300";
      case "praise": return "bg-green-100 border-green-300";
      case "correction": return "bg-red-100 border-red-300";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  // 合并相邻且相同类型的评论
  const getMergedComments = () => {
    return comments.reduce((acc: Comment[][], comment, index) => {
      const prevGroup = acc[acc.length - 1];
      
      if (!prevGroup) {
        return [[comment]];
      }

      const lastComment = prevGroup[prevGroup.length - 1];
      const isAdjacent = isCommentsAdjacent(lastComment, comment);
      const isSameType = lastComment.type === comment.type;  // 检查类型是否相同

      if (isAdjacent && isSameType) {  // 只有相邻且类型相同才合并
        prevGroup.push(comment);
        return acc;
      } else {
        return [...acc, [comment]];
      }
    }, []);
  };

  // 判断两个评论是否相邻
  const isCommentsAdjacent = (comment1: Comment, comment2: Comment) => {
    if (!comment1.position || !comment2.position) return false;
    
    const gap = Math.abs(comment1.position.to - comment2.position.from);
    return gap < 50; // 可以调整这个值来定义"相邻"的范围
  };

  const mergedComments = getMergedComments();

  return (
    <>
      {mergedComments.map((group, groupIndex) => (
        <div 
          key={groupIndex}
          className={`relative p-4 rounded-lg border shadow-lg mx-4 mb-4 ${getTypeColor(group[0].type)}`}
        >
          {group.map((comment, index) => (
            <div 
              key={index} 
              className="mb-3 last:mb-0"
            >
              <div className="text-gray-600 text-xs leading-relaxed">
                {comment.comment}
              </div>
            </div>
          ))}
          <div className="text-xs text-gray-500 mt-2 capitalize">
            {group[0].type}
          </div>
        </div>
      ))}
    </>
  );
}

// 修改定位函数以适应组
function getCommentPosition(from: number): number {
  const element = document.querySelector('.ProseMirror');
  if (!element) return 0;
  
  const editorRect = element.getBoundingClientRect();
  const scrollTop = element.scrollTop || 0;
  
  return from / element.textContent!.length * editorRect.height + scrollTop;
} 