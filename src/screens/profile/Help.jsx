import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scroll from "../../components/Scroll.jsx";
import SubHeader from "./SubHeader.jsx";

const SUPPORT_EMAIL = "support@lafet.app";

const FAQ = [
  {
    q: "Как сбросить прогресс?",
    a: "Открой Профиль → Помощь → внизу есть кнопка «Сбросить прогресс». Это удалит серию, статистику и пройденные модули. Действие необратимо.",
  },
  {
    q: "Что значит «серия»?",
    a: "Серия (streak) — это количество дней подряд, в которые ты учился хотя бы 1 минуту. Если пропустишь день — серия обнуляется.",
  },
  {
    q: "Сколько нужно заниматься в день?",
    a: "Минимум — 5 минут, чтобы сохранить серию. Оптимально — 10–15 минут: за месяц это даёт ощутимый прогресс. Цель ты выбираешь сам в настройках.",
  },
  {
    q: "Можно ли учить офлайн?",
    a: "Да. Все уроки и слова сохраняются локально — интернет нужен только при первом открытии. Прогресс хранится у тебя в браузере.",
  },
  {
    q: "Как изменить фото профиля?",
    a: "В Профиле нажми на круг с аватаром → выбери «Из галереи» или «Сделать фото». Изображение сохраняется только у тебя на устройстве.",
  },
  {
    q: "Чем отличаются Luğat, Grammatika и Dialog?",
    a: "Luğat — словарные модули с карточками. Grammatika — правила и упражнения. Dialog — живые диалоги с разбором фраз.",
  },
  {
    q: "Что такое уровень A1 — Kencetay?",
    a: "A1 — начальный уровень по европейской шкале. «Kencetay» — крымскотатарское название. Здесь ты учишь базовые слова, фразы и правила.",
  },
  {
    q: "Я нашёл ошибку — куда писать?",
    a: `Напиши нам на ${SUPPORT_EMAIL}. Опиши, что произошло, и приложи скриншот, если можно. Мы быстро исправим.`,
  },
];

function FaqItem({ T, item, isOpen, onToggle, idx }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * idx, duration: 0.25 }}
      style={{
        background: T.card,
        border: `1px solid ${isOpen ? T.accent : T.border}`,
        borderRadius: 14,
        marginBottom: 8,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "13px 14px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Nunito',sans-serif",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: isOpen ? T.accent : T.card2,
            color: isOpen ? "#fff" : T.text2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 900,
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          ?
        </div>
        <span
          style={{
            flex: 1,
            color: T.text,
            fontSize: 13,
            fontWeight: 800,
            lineHeight: 1.35,
          }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          style={{
            color: T.text2,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: T.text2,
                fontSize: 12,
                lineHeight: 1.55,
                margin: 0,
                padding: "0 14px 14px 54px",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Help({ T, onBack }) {
  const [openIdx, setOpenIdx] = useState(null);

  function copyEmail() {
    try {
      navigator.clipboard?.writeText(SUPPORT_EMAIL);
    } catch {}
  }

  return (
    <Scroll T={T}>
      <SubHeader T={T} title="Помощь" subtitle="Yardım" onBack={onBack} />

      <div style={{ padding: "0 18px" }}>
        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg,#00CEC9,#00B894)",
            borderRadius: 20,
            padding: "16px 18px",
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 28px rgba(0,184,148,0.35)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              position: "relative",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                flexShrink: 0,
              }}
            >
              💬
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 900,
                  margin: 0,
                }}
              >
                Связаться с нами
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 11,
                  margin: "2px 0 0",
                }}
              >
                Отвечаем в течение 24 часов
              </p>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.16)",
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 16 }}>📧</span>
            <span
              style={{
                flex: 1,
                color: "#fff",
                fontSize: 13,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace, 'Nunito'",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {SUPPORT_EMAIL}
            </span>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={copyEmail}
              style={{
                background: "rgba(255,255,255,0.22)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                padding: "6px 12px",
                fontSize: 11,
                fontWeight: 800,
                fontFamily: "'Nunito',sans-serif",
                cursor: "pointer",
              }}
            >
              Копировать
            </motion.button>
          </div>

          <motion.a
            whileTap={{ scale: 0.98 }}
            href={`mailto:${SUPPORT_EMAIL}?subject=Laf%20et%20—%20Помощь`}
            style={{
              display: "block",
              textAlign: "center",
              background: "#fff",
              color: "#00B894",
              borderRadius: 12,
              padding: "11px 0",
              marginTop: 10,
              fontSize: 14,
              fontWeight: 900,
              textDecoration: "none",
              fontFamily: "'Nunito',sans-serif",
              position: "relative",
            }}
          >
            ✉ Написать письмо
          </motion.a>
        </motion.div>

        {/* FAQ */}
        <p
          style={{
            color: T.text2,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1,
            textTransform: "uppercase",
            margin: "8px 0 10px",
          }}
        >
          Частые вопросы
        </p>

        {FAQ.map((item, i) => (
          <FaqItem
            key={i}
            T={T}
            item={item}
            idx={i}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}

        <p
          style={{
            color: T.text3,
            fontSize: 11,
            textAlign: "center",
            margin: "20px 0 0",
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          Не нашёл ответа?
          <br />
          Напиши нам на {SUPPORT_EMAIL} — мы поможем.
        </p>
      </div>
    </Scroll>
  );
}
