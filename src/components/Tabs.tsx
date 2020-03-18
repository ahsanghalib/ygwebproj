import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  tabList: {
    borderBottom: "1px solid #ccc",
    paddingLeft: 0
  },

  tabListItem: {
    display: "inline-block",
    listStyle: "none",
    marginBottom: "-1px",
    padding: "0.5rem 0.75rem"
  },

  tabListActive: {
    backgroundColor: "white",
    border: "solid #ccc",
    borderWidth: "1px 1px 0 1px"
  }
});

interface TabsProps {
  activeTabKey: string;
  tabStyle: "tab" | "accordion";
}

const Tabs: React.FC<TabsProps> = props => {
  const [activeTab, setActiveTab] = useState(props.activeTabKey);
  const classes = useStyles();

  function onClickTab(tab: string) {
    setActiveTab(tab);
  }

  return (
    <div>
      <ul className={classes.tabList}>
        {React.Children.map(props.children, (child: any) => {
          const { label } = child.props;
          return (
            <TabBar
              label={label}
              key={child.key}
              tabKey={child.key}
              activeTab={activeTab}
              onClick={onClickTab}
            />
          );
        })}
      </ul>
      <div>
        {React.Children.map(props.children, (child: any) => {
          if (child.key !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

interface TabPaneProps {
  label: string | React.ReactNode;
}

const TabPane: React.FC<TabPaneProps> = props => {
  return <div>{props.children}</div>;
};

interface TabBarProps {
  activeTab: string;
  label: string | React.ReactNode;
  tabKey: string;
  onClick: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = props => {
  const classes = useStyles();

  let className = classes.tabListItem;

  if (props.activeTab === props.tabKey) {
    className += " " + classes.tabListActive;
  }

  return (
    <li className={className} onClick={() => props.onClick(props.tabKey)}>
      {props.label}
    </li>
  );
};

export { Tabs, TabPane };
