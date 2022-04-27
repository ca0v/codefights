const enableLogging = process.argv.includes("--log");

function log(...message) {
  enableLogging && console.log(...message);
}

const tests = [
  `dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext`,
  `dir\n\tsubdir1\n\t\tsubsubdir1\n\t\t\tfile1.ext\n\t\t\tsubsubsubdir1\n\t\t\t\tfile2.ext\n\t\tfile2.ext\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile3.ext\n\t\t\tsubsubsubdir2\n\t\t\t\tfile4.ext`,
];

tests.forEach((test) => {
  console.log(test);
  console.log(solve(test));
});

function solve(treetext) {
  const roots = [];
  const context = [];
  const tokens = treetext.split("\n");
  let maxPath = "";
  tokens.forEach((token) => {
    const tabCount = token.lastIndexOf("\t") + 1;
    const name = token.substring(tabCount);
    const node = { name };
    if (0 === tabCount) {
      roots.push(node);
    } else {
      const parent = context[tabCount - 1];
      parent.children = parent.children || [];
      parent.children.push(node);
    }
    context.splice(tabCount, context.length - tabCount, node);
    const path = context.map((node) => node.name).join("/");
    if (path.length > maxPath.length) {
      maxPath = path;
    }
    log(maxPath, context);
  });
  return maxPath;
}
