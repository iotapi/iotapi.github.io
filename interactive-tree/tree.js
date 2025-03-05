/* Originally written for the Psi chapter at UCLA.
   Adapted for the Iota Pi chapter at Cal Poly SLO by Sean Gonzales (AB).
   This work may be used by any chapter that desires it.
*/

// Example: {"name": "Sean Gonzales", "class": "AB",  "active": "y", "parent": "Ben 'Baymax' Hull" }

// a dictionary that maps words to their corresponding Greek letters
var greekAlphabet = {
   "Alpha": "Α",
   "Beta": "Β",
   "Gamma": "Γ",
   "Delta": "Δ",
   "Epsilon": "Ε",
   "Zeta": "Ζ",
   "Eta": "Η",
   "Theta": "Θ",
   "Iota": "Ι",
   "Kappa": "Κ",
   "Lambda": "Λ",
   "Mu": "Μ",
   "Nu": "Ν",
   "Xi": "Ξ",
   "Omicron": "Ο",
   "Pi": "Π",
   "Rho": "Ρ",
   "Sigma": "Σ",
   "Tau": "Τ",
   "Upsilon": "Υ",
   "Phi": "Φ",
   "Chi": "Χ",
   "Psi": "Ψ",
   "Omega": "Ω"
};

// tree traversal algorithm (prefix)
function traverse(arr, tree, parent) {
   // check if current node is empty
   if (tree == null)
      return;

   // obtain text from current node
   var dataArr = $(tree).text().split("\n")[0].split(" ");

   // create name and class variables
   var name = "";
   var cls = "";

   // parse each word and concatenate to name or class
   for (var i = 0; i < dataArr.length; i++) {
      var str = dataArr[i];
      var checkStr = str.replace('(', '').replace(')', '');

      if (checkStr in greekAlphabet)
        cls += greekAlphabet[checkStr];
      else {
         if (cls != "")
            break;
         name += str + " ";
      }
   }

   // create data point for current brother and add to array
   var bro = {"name": name, "class": cls, "active": "n", "parent": parent};
   arr.push(bro);

   // filter out child elements to only obtain ordered lists (<ul>)
   var children = $($(tree)[0].children).filter(function() {
      if (this.tagName == "UL")
         return this;
   });

   // if there are no children, terminate next recursive call
   // else, loop through children with recursive calls
   if ($(children[0]).length == 0)
      traverse(arr, null, name);
   else {
      for (var i = 0; i < $(children[0])[0].children.length; i++) {
         traverse(arr, $(children[0])[0].children[i], name);
      }
   }
}

// obtains the family tree from the Iota Pi Wiki
function getTree() {
   var data;
   // make a synchronous ajax call to read the family tree page
   $.ajax({
      url: "/familytree.html",
      async: false,
      success: function(result) {
         // read html to obtain array of parent nodes (all of which are ordered lists <ul>)
         var html = jQuery('<div>').html(result);
         var fam = $("ul", $(html)).filter(function() {
            if (this.parentElement.className == "tree")
               return this;
         });


         // add root node to the array
         data = [{"name": "Iota Pi Chapter", "class": "",  "active": "n", "parent": "null" }];

         // for each parent node (the Alphas of each family), traverse their branches and add to array
         for (var i = 0; i < fam.length; i++) {
            data.push({"name": "Family " + (i+1), "class": "", "active": "n", "parent": "Iota Pi Chapter" });
            traverse(data, fam[i].children[0], "Family " + (i+1));
         }
      },
      
   });

   return data;
}

var data = getTree();

var dataMap = data.reduce(function(map, node) {
   map[node.name] = node;
   return map;
}, {});


var treeData = [];
data.forEach(function(node) {
   // add to parent
   var parent = dataMap[node.parent];
   if (parent) {
      // create child array if it doesn't exist
      (parent.children || (parent.children = []))
      // add node to child array
      .push(node);
   } else {
      // parent is null or missing
      treeData.push(node);
   }
});

// ************** Generate the tree diagram  *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
width = 4000 - margin.right - margin.left,
height = 3000 - margin.top - margin.bottom;

var i = 0,
duration = 500,
root;

var tree = d3.layout.tree()
.size([height, width]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.call(zm = d3.behavior.zoom().scaleExtent([0.1,3]).on("zoom", redraw)).append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

zm.translate([350, 20]);

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select("#body").style("height", "500px");


function update(source) {
   // Compute the new tree layout.
   var nodes = tree.nodes(root).reverse(),
   links = tree.links(nodes);

   // Normalize for fixed-depth.
   nodes.forEach(function(d) { d.y = d.depth * 270; });

   // Update the nodes…
   var node = svg.selectAll("g.node")
   .data(nodes, function(d) { return d.id || (d.id = ++i); });

   // Enter any new nodes at the parent's previous position.
   var nodeEnter = node.enter().append("g")
   .attr("class", "node")
   .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
   .on("click", click);

   nodeEnter.append("circle")
   .attr("r", 1e-6)
   .style("fill", function(d) { return d._children ? "royalblue" : "#fff"; });

   nodeEnter.append("text")
   .attr("x", function(d) { return d.children || d._children ? -13 : -13; })
   .attr("y", -10)
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "end"; })
   .text(function(d) { return d.name; })
   .style("fill-opacity", 1);

   nodeEnter.append("text")
   .attr("x", function(d) { return d.children || d._children ? -13 : -13; })
   .attr("y", 10)
   .attr("dy", ".35em")
   .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "end"; })
   .text(function(d) { return d.class; })
   .style("fill-opacity", 1);



   // Transition nodes to their new position.
   var nodeUpdate = node.transition()
   .duration(duration)
   .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

   nodeUpdate.select("circle")
   .attr("r", 11)
   .style("fill", function(d) { 
      if ( d._children )
         return "royalblue";
      if ( d.active === "y" )
         return "gold";
      return "#fff"; });

   nodeUpdate.select("text")
   .style("fill-opacity", 1);

   // Transition exiting nodes to the parent's new position.
   var nodeExit = node.exit().transition()
   .duration(duration)
   .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
   .remove();

   nodeExit.select("circle")
   .attr("r", 1e-6);

   nodeExit.select("text")
   .style("fill-opacity", 1e-6);

   // Update the links…
   var link = svg.selectAll("path.link")
   .data(links, function(d) { return d.target.id; });

   // Enter any new links at the parent's previous position.
   link.enter().insert("path", "g")
   .attr("class", "link")
   .attr("d", function(d) {
      var o = {x: source.x0, y: source.y0};
      return diagonal({source: o, target: o});
   });

   // Transition links to their new position.
   link.transition()
   .duration(duration)
   .attr("d", diagonal);

   // Transition exiting nodes to the parent's new position.
   link.exit().transition()
   .duration(duration)
   .attr("d", function(d) {
      var o = {x: source.x, y: source.y};
      return diagonal({source: o, target: o});
   })
   .remove();

   // Stash the old positions for transition.
   nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
   });
}

function click(d) {
   if (d.children) {
      d._children = d.children;
      d.children = null;
   } else {
      d.children = d._children;
      d._children = null;
   }
   update(d);
}

function redraw() {
   //console.log("here", d3.event.translate, d3.event.scale);
   svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}
