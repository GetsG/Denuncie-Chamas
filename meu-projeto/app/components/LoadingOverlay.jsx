"use client"
import styles from "./LoadingOverlay.module.css"

export default function LoadingOverlay({ show }) {
  if (!show) return null

  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  )
}