import React, { useEffect, useRef, useState } from "react";
import { Tree } from "react-d3-tree";
import "../../../shared/components/MLMTree.scss";

const MLMTree = ({ className, networkData }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const treeContainerRef = useRef(null);

  const getRandomChildrenCount = () => Math.floor(Math.random() * 3) + 1; // 1-3
  const getRandomEarnings = () => Math.floor(Math.random() * 1200) + 800;

  const calculateTeamSize = (node) => {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + node.children.reduce((sum, c) => sum + calculateTeamSize(c), 0);
  };

  // Generate tree data from network data or create sample data
  const generateTreeData = () => {
    if (networkData && networkData.length > 0) {
      // Use real network data if available
      return convertNetworkDataToTree(networkData);
    }

    // Fallback to sample data
    const MAX_LEVEL = 2; // 0,1,2 => three levels

    const createNode = (name, role, earnings, level) => {
      const children =
        level < MAX_LEVEL
          ? Array.from({ length: getRandomChildrenCount() }, (_, i) => {
              // decide child naming & role based on next level
              const childLevel = level + 1;
              const childName = childLevel === 1 ? `B${i + 1}` : `C${i + 1}`; // level1 B, level2 C
              const childRole =
                childLevel === 1 ? "Regional Manager" : "Team Lead";
              const childEarnings =
                childLevel === 1
                  ? getRandomEarnings() + 5000
                  : getRandomEarnings() + 2000;

              return createNode(
                childName,
                childRole,
                childEarnings,
                childLevel
              );
            })
          : [];

      const node = {
        name,
        role,
        earnings,
        teamSize: 0,
        children: children.length > 0 ? children : undefined,
      };

      return node;
    };

    // root with 4 regional managers
    const regionalManagers = Array.from({ length: 4 }, (_, i) =>
      createNode(`B${i + 1}`, "Regional Manager", getRandomEarnings() + 5000, 1)
    );

    // set team size for regional managers
    regionalManagers.forEach((m) => {
      m.teamSize = calculateTeamSize(m) - 1;
    });

    const treeData = {
      name: "A",
      role: "Chief Executive",
      earnings: 15420,
      teamSize: 0,
      children: regionalManagers,
    };

    treeData.teamSize = calculateTeamSize(treeData) - 1;

    return treeData;
  };

  // Convert network data to tree format
  const convertNetworkDataToTree = (networkMembers) => {
    // This is a simplified conversion - you might need to adjust based on your actual data structure
    const root = {
      name: "You",
      role: "Chief Executive",
      earnings: 15420,
      teamSize: networkMembers.length,
      children: networkMembers.slice(0, 4).map((member, index) => ({
        name: member.name || `Member ${index + 1}`,
        role: "Regional Manager",
        earnings: member.earnings || getRandomEarnings() + 5000,
        teamSize: 0,
        children: member.children || [],
      })),
    };

    return root;
  };

  const treeData = generateTreeData();

  useEffect(() => {
    const updateDimensions = () => {
      if (treeContainerRef.current) {
        const { width, height } =
          treeContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Custom diagonal cubic Bezier path for vertical orientation
  const customDiagonalPath = (linkDatum) => {
    const source = linkDatum.source;
    const target = linkDatum.target;

    const sourceX = source.x;
    const sourceY = source.y;
    const targetX = target.x;
    const targetY = target.y;

    const midX = (sourceX + targetX) / 2;

    // note: react-d3-tree vertical uses (x = horizontal, y = vertical)
    return `M ${sourceX} ${sourceY}
            C ${sourceX} ${midX}
              ${targetX} ${midX}
              ${targetX} ${targetY}`;
  };

  const renderCustomNode = ({ nodeDatum }) => {
    const isCEO = nodeDatum.role === "Chief Executive";
    const isManager = nodeDatum.role === "Regional Manager";
    const isTeamLead = nodeDatum.role === "Team Lead";
    const isMember = nodeDatum.role === "Member";
    const isSupervisor = nodeDatum.role === "Supervisor";
    const isCoordinator = nodeDatum.role === "Coordinator";

    const nodeRadius = isCEO
      ? 30
      : isManager
      ? 25
      : isTeamLead
      ? 20
      : isSupervisor
      ? 18
      : isCoordinator
      ? 16
      : 14;

    const textY = isCEO
      ? 50
      : isManager
      ? 45
      : isTeamLead
      ? 40
      : isSupervisor
      ? 38
      : isCoordinator
      ? 36
      : 34;

    const fontSize = isCEO
      ? "16"
      : isManager
      ? "14"
      : isTeamLead
      ? "12"
      : isSupervisor
      ? "11"
      : isCoordinator
      ? "10"
      : "9";

    const displayRole = isCEO
      ? "CEO"
      : isManager
      ? "Manager"
      : isTeamLead
      ? "Team Lead"
      : isSupervisor
      ? "Supervisor"
      : isCoordinator
      ? "Coordinator"
      : "Member";

    return (
      <g>
        <circle
          r={nodeRadius}
          fill="#3b82f6"
          stroke="#1d4ed8"
          strokeWidth="2"
          className="nodeCircle"
        />

        <text
          textAnchor="middle"
          x="0"
          y={textY}
          fill="#1e293b"
          fontSize={fontSize}
          fontWeight="600"
          className="nodeText"
        >
          {displayRole}
        </text>

        {isCEO && (
          <g transform="translate(0, 65)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="10"
              fontWeight="400"
              className="detailText"
            >
              Department: Executive
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="15"
              fill="#64748b"
              fontSize="10"
              fontWeight="400"
              className="detailText"
            >
              Earnings: ${nodeDatum.earnings?.toLocaleString?.() ?? ""}
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="30"
              fill="#64748b"
              fontSize="10"
              fontWeight="400"
              className="detailText"
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isManager && (
          <g transform="translate(0, 60)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="9"
              fontWeight="400"
              className="detailText"
            >
              Department: Regional
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="12"
              fill="#64748b"
              fontSize="9"
              fontWeight="400"
              className="detailText"
            >
              Earnings: ${nodeDatum.earnings?.toLocaleString?.() ?? ""}
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="24"
              fill="#64748b"
              fontSize="9"
              fontWeight="400"
              className="detailText"
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isTeamLead && (
          <g transform="translate(0, 55)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="8"
              fontWeight="400"
              className="detailText"
            >
              Department: Operations
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="10"
              fill="#64748b"
              fontSize="8"
              fontWeight="400"
              className="detailText"
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="20"
              fill="#64748b"
              fontSize="8"
              fontWeight="400"
              className="detailText"
            >
              Weekly Hours: 40
            </text>
          </g>
        )}

        {isSupervisor && (
          <g transform="translate(0, 50)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="7"
              fontWeight="400"
              className="detailText"
            >
              Department: Field
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="9"
              fill="#64748b"
              fontSize="7"
              fontWeight="400"
              className="detailText"
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isCoordinator && (
          <g transform="translate(0, 45)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="7"
              fontWeight="400"
              className="detailText"
            >
              Department: Support
            </text>
            <text
              textAnchor="middle"
              x="0"
              y="9"
              fill="#64748b"
              fontSize="7"
              fontWeight="400"
              className="detailText"
            >
              Team Size: {nodeDatum.teamSize} members
            </text>
          </g>
        )}

        {isMember && (
          <g transform="translate(0, 40)">
            <text
              textAnchor="middle"
              x="0"
              y="0"
              fill="#64748b"
              fontSize="6"
              fontWeight="400"
              className="detailText"
            >
              Department: General
            </text>
          </g>
        )}
      </g>
    );
  };

  return (
    <div className={`mlmTreeContainer ${className || ""}`}>
      <div className="treeWrapper" ref={treeContainerRef}>
        {dimensions.width > 0 && (
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: dimensions.width / 2, y: 50 }}
            pathFunc={customDiagonalPath}
            pathClassFunc={() => "treeLink"}
            nodeSize={{ x: 200, y: 150 }}
            separation={{ siblings: 1.5, nonSiblings: 2.0 }}
            transitionDuration={600}
            renderCustomNodeElement={renderCustomNode}
            zoom={0.7}
            scaleExtent={{ min: 0.3, max: 1.2 }}
            enableLegacyTransitions={true}
          />
        )}
      </div>
    </div>
  );
};

export default MLMTree;
