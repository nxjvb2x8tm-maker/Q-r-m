import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoPicker({ T, open, onClose, onPick, hasPhoto, onRemove }) {
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  function readFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onPick(ev.target.result);
      onClose();
    };
    reader.readAsDataURL(file);
    // reset so the same file can be selected again later
    e.target.value = "";
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 200,
            }}
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: T.card,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: "12px 18px 24px",
              zIndex: 201,
              boxShadow: "0 -10px 40px rgba(0,0,0,0.35)",
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: 44,
                height: 5,
                borderRadius: 3,
                background: T.border,
                margin: "0 auto 14px",
              }}
            />

            <h3
              style={{
                color: T.text,
                fontSize: 17,
                fontWeight: 900,
                margin: "0 0 4px",
                textAlign: "center",
              }}
            >
              Фото профиля
            </h3>
            <p
              style={{
                color: T.text2,
                fontSize: 12,
                margin: "0 0 18px",
                textAlign: "center",
              }}
            >
              Хранится локально, никуда не отправляется
            </p>

            {/* Hidden inputs */}
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              onChange={readFile}
              style={{ display: "none" }}
            />
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={readFile}
              style={{ display: "none" }}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => galleryRef.current?.click()}
              style={{
                width: "100%",
                background: T.card2,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                fontFamily: "'Nunito',sans-serif",
                color: T.text,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#6C5CE7,#A29BFE)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                🖼
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ color: T.text, fontSize: 14, fontWeight: 800, margin: 0 }}>
                  Выбрать из галереи
                </p>
                <p style={{ color: T.text2, fontSize: 11, margin: "2px 0 0" }}>
                  PNG, JPG до 10 МБ
                </p>
              </div>
              <span style={{ color: T.text2, fontSize: 16 }}>›</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => cameraRef.current?.click()}
              style={{
                width: "100%",
                background: T.card2,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                fontFamily: "'Nunito',sans-serif",
                color: T.text,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#FD79A8,#F953C6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                📸
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ color: T.text, fontSize: 14, fontWeight: 800, margin: 0 }}>
                  Сделать фото
                </p>
                <p style={{ color: T.text2, fontSize: 11, margin: "2px 0 0" }}>
                  Снять через камеру
                </p>
              </div>
              <span style={{ color: T.text2, fontSize: 16 }}>›</span>
            </motion.button>

            {hasPhoto && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onRemove();
                  onClose();
                }}
                style={{
                  width: "100%",
                  background: "rgba(255,118,117,0.12)",
                  border: "1px solid rgba(255,118,117,0.4)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "rgba(255,118,117,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  🗑
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                  <p style={{ color: "#FF7675", fontSize: 14, fontWeight: 800, margin: 0 }}>
                    Удалить фото
                  </p>
                  <p style={{ color: T.text2, fontSize: 11, margin: "2px 0 0" }}>
                    Вернуть стандартный аватар
                  </p>
                </div>
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderRadius: 14,
                padding: "14px 0",
                marginTop: 4,
                color: T.text2,
                fontFamily: "'Nunito',sans-serif",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Отмена
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
