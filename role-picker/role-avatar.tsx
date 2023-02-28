import classNames from "classnames";
import styles from "./styles.module.scss";

const RoleAvatar = ({ name, onClick, isActive }: any) => {
  return (
    <li
      onClick={onClick}
      className={classNames(
        styles["source-item"],
        isActive && styles["active"]
      )}
    >
      <div className={styles["avatar-wrap"]}>
        <picture>
          <img
            className={styles["avatar-bg"]}
            src={`party-animals/characters_avatar_hover.png`}
            alt="characters_avatar_hover"
          />
        </picture>
        <picture>
          <img
            className={styles["avatar-source"]}
            src={`party-animals/characters_${name}_avatar.png`}
            alt={name}
          />
        </picture>
      </div>
    </li>
  );
}

export default RoleAvatar
