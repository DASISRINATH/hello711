import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { CallFilterOptions } from "../Config/Config";

import { ReactComponent as SearchSvg } from "../../../../assets/chat/media/icons/search.svg";

// Top chat filter
const CallFilter = (props) => {
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    switch (props.selectedOption) {
      case CallFilterOptions.AllCalls:
        setSelectedTitle("All Calls");
        break;
      case CallFilterOptions.Incoming:
        setSelectedTitle("Incoming");
        break;
      case CallFilterOptions.Outgoing:
        setSelectedTitle("Outgoing");
        break;
      case CallFilterOptions.Missedcalls:
        setSelectedTitle("Missed Calls");
        break;
      default:
        break;
    }
    return () => {};
  }, [props.selectedOption]);

  const handleChange = async (eventKey) => {
    // console.log(eventKey);
    await props.filterOptionChanged(parseInt(eventKey));
  };

  return (
    <div className="sidebar-sub-header">
      <DropdownButton
        className="border-0 f-16 p-0 min-w-150 cut-texts"
        variant="outline-default"
        onSelect={handleChange}
        title={selectedTitle}
      >
        <Dropdown.Item
          eventKey={CallFilterOptions.AllCalls}
          active={props.selectedOption === CallFilterOptions.AllCalls}
        >
          All Calls
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={CallFilterOptions.Incoming}
          active={props.selectedOption === CallFilterOptions.Incoming}
        >
          Incoming
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={CallFilterOptions.Outgoing}
          active={props.selectedOption === CallFilterOptions.Outgoing}
        >
          Outgoing
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={CallFilterOptions.Missedcalls}
          active={props.selectedOption === CallFilterOptions.Missedcalls}
        >
          Missed Calls
        </Dropdown.Item>
      </DropdownButton>

      <form className="form-inline">
        <div className="input-group">
          <input
            type="text"
            className="form-control search border-right-0 transparent-bg pr-0"
            placeholder="Search users..."
            value={props.search}
            onChange={props.handleSearch}
          ></input>
          <div className="input-group-append">
            <div
              className="input-group-text transparent-bg border-left-0"
              role="button"
            >
              <SearchSvg className="text-muted hw-20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CallFilter;
