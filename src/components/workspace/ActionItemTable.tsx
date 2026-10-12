import React, { useState } from 'react';
import { useWorkshop } from '../../context/WorkshopContext';
import { ActionItem } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const ActionItemTable: React.FC = () => {
  const { state, actions } = useWorkshop();
  const [task, setTask] = useState('');
  const [owner, setOwner] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    actions.addActionItem({
      task: task.trim(),
      owner: owner.trim() || 'Unassigned',
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'todo'
    });

    setTask('');
    setOwner('');
    setDueDate('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 4 of 4: Blue Hat Synthesis</span>
          <h3 className="text-xl font-black text-slate-900">Agreed Action Items & Owners</h3>
        </div>
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New concrete action item..."
          className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Owner (e.g. Alex)"
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </form>

      {state.actionItems.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-xs italic">
          No action items recorded yet. Turn ideas from Yellow/Green/Black into assigned tasks.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                <th className="py-2 px-3">Task</th>
                <th className="py-2 px-3">Owner</th>
                <th className="py-2 px-3">Target Date</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {state.actionItems.map((item: ActionItem) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.task}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.owner}</td>
                  <td className="py-2.5 px-3 text-slate-500">{item.dueDate}</td>
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={() => {
                        const nextStatus = item.status === 'todo' ? 'in_progress' : item.status === 'in_progress' ? 'done' : 'todo';
                        actions.updateActionItem({ ...item, status: nextStatus });
                      }}
                      className={`px-2 py-0.5 rounded-full font-bold uppercase text-[10px] cursor-pointer ${
                        item.status === 'done'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => actions.deleteActionItem(item.id)}
                      className="text-slate-300 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
