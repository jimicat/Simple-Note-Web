import { FolderClosed, Trash2, Plus } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="w-64 border-r border-gray-700 flex flex-col">
      <div className="p-2">
        <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 bg-[#2d2d2d] hover:bg-[#3d3d3d]">
          <FolderClosed size={16} />
          <span>所有 iCloud 备忘录</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 mt-1 hover:bg-[#3d3d3d]">
          <FolderClosed size={16} />
          <span>备忘录</span>
        </button>
        <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 hover:bg-[#3d3d3d]">
          <Trash2 size={16} />
          <span>最近删除</span>
        </button>
      </div>
      <div className="mt-auto p-2">
        <button className="w-full text-left px-3 py-2 rounded flex items-center gap-2 text-yellow-500 hover:bg-[#3d3d3d]">
          <Plus size={16} />
          <span>新建文件夹</span>
        </button>
      </div>
    </div>
  );
}