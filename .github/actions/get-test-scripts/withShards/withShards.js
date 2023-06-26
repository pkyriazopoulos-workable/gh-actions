const withShards = ({ name, script, shardsNum = 2 }) => {
  const scripts = [];

  for (let i = 1; i <= shardsNum; i++) {
    scripts.push({
      name: `${name} ${i}/${shardsNum}`,
      script: `CI_NODE_INDEX=${i} ${script} --shard ${i}/${shardsNum}`,
    });
  }

  return scripts;
};

module.exports = withShards;
