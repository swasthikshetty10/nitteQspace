import { Tabs } from "flowbite-react";
import React from "react";

function resources() {
  const tabs = ['CSE', 'ISE', "MECH", "ECE", "EEE", "BT", "CIVIL", "AIML", "AIDS", "ROB", "MCA", "MTECH"];
  const ele = tabs.map((tab) => { return <Tabs.Item title={tab} active={false} key="tab">{tab} Content</Tabs.Item> });
  return <>
    <h4>Select Department</h4>
    <Tabs.Group className="flex flex-row items-start justify-around w-full">
      {ele}
    </Tabs.Group>
  </>;
}

export default resources;
