import React, { forwardRef, useImperativeHandle, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./_segmentedbar.module.scss";

const SegmentedBar = forwardRef((props, ref) => {
  const { items, handleTabNumber, selected, type = "default", style={}, bgColor='' } = props;
  console.log(selected,"selected++++")
  const [activeItem, setActiveitem] = useState(selected || 0);

  useImperativeHandle(ref, () => ({
    changeTab
  }))

  const changeTab=(i)=>{
    setActiveitem(i);
  }

  const handleClick = (i) => {
    setActiveitem(i);
    handleTabNumber(i);
  };


  return (
    <AnimateSharedLayout>
      <ol
        className={`${
          type == "default"
            ? styles.list
            : type == "productInsight"
            ? styles.productInsight
            : styles.navList
        }`}
        style={{background: bgColor}}
        ref={ref}
      >
        {items.map((item, i) => {
          const isActive = i === activeItem;
          return (
            <motion.li
              className={
                isActive || i === activeItem - 1
                  ? styles.itemNoDivider
                  : styles.item
              }
              whileTap={isActive ? { scale: 1.05 } : { opacity: 0.6 }}
              key={item}
            >
              <button
                onClick={() => handleClick(i)}
                type="button"
                className={`${
                  type == "default"
                    ? styles.button
                    : type == "productInsight"
                    ? styles.productInsightButton
                    : styles.buttonNav
                }`}
                style={style}
              >
                {isActive && (
                  <motion.div
                    layoutId="SegmentedControlActive"
                    className={styles.active}
                  />
                )}
                <span
                  className={`${
                    type == "default" ? styles.label : styles.labelNav
                  }`}
                  style={isActive ? props.theme === 'dark' ? { color: "#0A0A0A" } : { color: "#FFFFFF" } : null}
                >
                  {item}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </AnimateSharedLayout>
  );
});

SegmentedBar.propTypes = {
  items: PropTypes.array.isRequired,
  handleTabNumber: PropTypes.func.isRequired,
  selected: PropTypes.number,
  // variant: PropTypes.string
};

SegmentedBar.displayName = 'SegmentedBar';

export default SegmentedBar;
