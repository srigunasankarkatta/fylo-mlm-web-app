import React from "react";
import clsx from "clsx";
import styles from "./AdminFooter.module.scss";

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.adminFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p className={styles.copyright}>
            © {currentYear} Fylo MLM. All rights reserved.
          </p>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="#" className={styles.footerLink}>
              Terms of Service
            </a>
            <a href="#" className={styles.footerLink}>
              Support
            </a>
          </div>

          <div className={styles.versionInfo}>
            <span className={styles.versionText}>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
