import { useMemo, useState } from 'react';
import {
  Bell,
  CheckCheck,
  CircleCheck,
  FileText,
  GraduationCap,
  MessageSquareWarning,
  SlidersHorizontal,
} from 'lucide-react';

const initialItems = [
  {
    id: 1,
    title: 'Interview feedback ready',
    desc: 'Your latest technical round summary is available. Review the feedback and retry weak answers.',
    icon: Bell,
    type: 'Interview',
    priority: 'High',
    action: 'Open feedback',
    read: false,
  },
  {
    id: 2,
    title: 'Skill verification approved',
    desc: 'React has been marked as verified in your competency profile.',
    icon: CircleCheck,
    type: 'Skills',
    priority: 'Medium',
    action: 'View skill graph',
    read: false,
  },
  {
    id: 3,
    title: 'Resume improvement note',
    desc: 'Your resume needs stronger project impact metrics and more role-relevant keywords.',
    icon: FileText,
    type: 'Resume',
    priority: 'High',
    action: 'Run analyzer',
    read: false,
  },
  {
    id: 4,
    title: 'Mentor reminder',
    desc: 'Prepare one project explanation before your next placement review.',
    icon: GraduationCap,
    type: 'Mentor',
    priority: 'Medium',
    action: 'Prepare story',
    read: true,
  },
  {
    id: 5,
    title: 'Portfolio checklist updated',
    desc: 'Add GitHub links and one impact statement for every live project.',
    icon: CircleCheck,
    type: 'Portfolio',
    priority: 'Medium',
    action: 'Update portfolio',
    read: false,
  },
  {
    id: 6,
    title: 'Skill graph changed',
    desc: 'Your profile graph now reflects the latest skill proficiency levels.',
    icon: Bell,
    type: 'Skills',
    priority: 'Low',
    action: 'View graph',
    read: true,
  },
];

const filters = ['All', 'Unread', 'High', 'Skills', 'Resume', 'Interview', 'Portfolio'];

export default function Notifications() {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(initialItems[0].id);

  const filteredItems = useMemo(() => {
    if (filter === 'All') return items;
    if (filter === 'Unread') return items.filter((item) => !item.read);
    if (filter === 'High') return items.filter((item) => item.priority === 'High');
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  const selected = items.find((item) => item.id === selectedId) || filteredItems[0] || items[0];
  const unreadCount = items.filter((item) => !item.read).length;
  const highCount = items.filter((item) => item.priority === 'High' && !item.read).length;

  const markRead = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const completeAction = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true, desc: `${item.desc} Action marked complete.` }
          : item
      )
    );
  };

  return (
    <div className="fade-up">
      <div style={head}>
        <div>
          <h1 style={title}>Notifications</h1>
          <p style={sub}>
            Working alert center for resume, interview, skill, portfolio, and mentor updates.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={markAllRead}>
          <CheckCheck size={16} />
          Mark all read
        </button>
      </div>

      <div style={quickGrid}>
        {[
          ['Unread', `${unreadCount} pending`],
          ['High priority', `${highCount} urgent`],
          ['This week', '3 growth updates'],
        ].map(([label, value]) => (
          <div key={label} className="card" style={quickCard}>
            <div style={quickLabel}>{label}</div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="card" style={filterBar}>
        <SlidersHorizontal size={16} color="var(--text-soft)" />
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            style={{ ...filterBtn, ...(filter === item ? filterBtnActive : {}) }}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={layout}>
        <div style={list}>
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="card"
                style={{
                  ...row,
                  ...(selected?.id === item.id ? rowActive : {}),
                  ...(item.read ? rowRead : {}),
                }}
                onClick={() => {
                  setSelectedId(item.id);
                  markRead(item.id);
                }}
              >
                <div style={iconWrap}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={rowTop}>
                    <div style={rowTitle}>{item.title}</div>
                    {!item.read && <span style={dot} />}
                  </div>
                  <div style={rowDesc}>{item.desc}</div>
                  <div style={tagRow}>
                    <span style={tag}>{item.type}</span>
                    <span style={item.priority === 'High' ? dangerTag : tag}>{item.priority}</span>
                  </div>
                </div>
              </button>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="card" style={emptyCard}>
              <MessageSquareWarning size={18} />
              <span>No notifications match this filter.</span>
            </div>
          )}
        </div>

        {selected && (
          <div className="card" style={detailCard}>
            <div style={quickLabel}>Selected alert</div>
            <h2 style={detailTitle}>{selected.title}</h2>
            <p style={detailText}>{selected.desc}</p>

            <div style={detailMeta}>
              <span style={tag}>{selected.type}</span>
              <span style={selected.priority === 'High' ? dangerTag : tag}>{selected.priority}</span>
              <span style={tag}>{selected.read ? 'Read' : 'Unread'}</span>
            </div>

            <div style={detailActions}>
              <button className="btn btn-primary" onClick={() => completeAction(selected.id)}>
                {selected.action}
              </button>
              <button className="btn btn-secondary" onClick={() => markRead(selected.id)}>
                Mark read
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const head = { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 18 };
const title = { fontSize: 34, marginBottom: 8 };
const sub = { color: 'var(--text-soft)', lineHeight: 1.7, maxWidth: 720 };
const quickGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 16 };
const quickCard = { padding: 18 };
const quickLabel = { color: 'var(--text-faint)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800, marginBottom: 8 };
const filterBar = { padding: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 16 };
const filterBtn = { border: '1px solid var(--border)', background: '#fff', color: 'var(--text-soft)', borderRadius: 999, padding: '8px 12px', fontWeight: 700 };
const filterBtnActive = { background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' };
const layout = { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, 390px)', gap: 18, alignItems: 'start' };
const list = { display: 'grid', gap: 12 };
const row = { padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', cursor: 'pointer' };
const rowActive = { borderColor: 'var(--primary)', boxShadow: '0 14px 30px rgba(15,118,110,0.12)' };
const rowRead = { opacity: 0.72 };
const iconWrap = { width: 40, height: 40, borderRadius: 14, background: 'var(--primary-soft)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const rowTop = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 };
const rowTitle = { fontWeight: 800, marginBottom: 6 };
const rowDesc = { color: 'var(--text-soft)', lineHeight: 1.6, fontSize: 14 };
const dot = { width: 9, height: 9, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 };
const tagRow = { display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' };
const tag = { padding: '5px 9px', borderRadius: 999, background: 'var(--surface-muted)', border: '1px solid var(--border)', color: 'var(--text-soft)', fontSize: 12, fontWeight: 800 };
const dangerTag = { ...tag, background: '#fff4f4', borderColor: '#f3caca', color: 'var(--danger)' };
const emptyCard = { padding: 16, display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--text-soft)' };
const detailCard = { padding: 22, position: 'sticky', top: 24 };
const detailTitle = { fontSize: 24, marginBottom: 10 };
const detailText = { color: 'var(--text-soft)', lineHeight: 1.7, marginBottom: 14 };
const detailMeta = { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 };
const detailActions = { display: 'flex', gap: 10, flexWrap: 'wrap' };
