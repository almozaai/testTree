import * as d3 from 'd3'

const  table = [
    { id: 0, idea: "1" },
    { id: 1, idea: "1.1", ideaId: 0 },
    { id: 2, idea: "1.2", ideaId: 0 },
    { id: 3, idea: "1.3", ideaId: 0 },
    { id: 4, idea: "1.1.1", ideaId: 1 },
    { id: 5, idea: "1.1.1.1", ideaId: 4 },
    { id: 6, idea: "1.1.1.2", ideaId: 4 },
  ]

const generateTree = (ideas) =>{
    const topParent = ideas.find(idea => idea.ideaId === undefined)
    const tree = { ...topParent }
    tree.children = generateParents(ideas, topParent)
    return tree
  }
  
  const generateParents = (ideas, parent) =>{
    return ideas.filter(idea => idea.ideaId === parent.id)
      .map(idea =>{
      idea.children = generateParents(ideas, idea)
      return idea
    })
  }

  const tree = generateTree(table)

  export default class MindMap{
    constructor(element){
        const dataStructure = d3.hierarchy(tree)
        const treeLayout = d3.tree().size([400, 200])
        const information = treeLayout(dataStructure)
        const  svg = d3.select(element)
                        .append('svg')
                        .attr('width', 500)
                        .attr('height', 500)
        const circles = svg.append('g').selectAll('circle')
                            .data(information.descendants())
            circles.enter().append('circle')
                .attr('cx', function(d){ return d.x })
                .attr('cy', function(d){return d.y})
                .attr('r',5)
    }
  }