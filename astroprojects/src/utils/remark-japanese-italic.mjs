import { visit } from 'unist-util-visit';

export function remarkJapaneseItalic() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      // Find non-escaped underscores that wrap some content
      const regex = /(?<!\\)_(.+?)(?<!\\)_/g;
      
      if (!regex.test(node.value)) return;
      
      const children = [];
      let lastIndex = 0;
      let match;
      regex.lastIndex = 0; // reset
      
      while ((match = regex.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          children.push({
            type: 'text',
            value: node.value.slice(lastIndex, match.index)
          });
        }
        
        children.push({
          type: 'emphasis',
          children: [{ type: 'text', value: match[1] }]
        });
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < node.value.length) {
        children.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }
      
      parent.children.splice(index, 1, ...children);
    });
  };
}
