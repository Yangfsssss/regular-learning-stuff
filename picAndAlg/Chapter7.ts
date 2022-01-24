/** Chapter7：狄克斯特拉算法 */

//本章内容
//❑ 继续图的讨论，介绍加权图——提高或降低某些边的权重。
//❑ 介绍狄克斯特拉算法，让你能够找出加权图中前往X的最短路径。
//❑ 介绍图中的环，它导致狄克斯特拉算法不管用。

//7.1 使用狄克斯特拉算法---------------------------------------------------------------------------------------------------------
//狄克斯特拉算法包含4个步骤。
//(1) 找出“最便宜”的节点，即可在最短时间内到达的节点。
//(2) 更新该节点的邻居的开销，其含义将稍后介绍。
//(3) 重复这个过程，直到对图中的每个节点都这样做了。
//(4) 计算最终路径。

//7.2 术语----------------------------------------------------------------------------------------------------------------------------
//介绍其他狄克斯特拉算法使用示例前，先来澄清一些术语。
//狄克斯特拉算法用于每条边都有关联数字的图，这些数字称为权重（weight）。
//带权重的图称为加权图（weighted graph），不带权重的图称为非加权图（unweighted graph）。
//要计算非加权图中的最短路径，可使用广度优先搜索。要计算加权图中的最短路径，可使用狄克斯特拉算法。
//图还可能有环，绕环的路径不可能是最短的路径。
//无向图意味着两个节点彼此指向对方，其实就是环！
//在无向图中，每条边都是一个环。狄克斯特拉算法只适用于有向无环图（directed acyclic graph, DAG）。

//7.3 换钢琴-------------------------------------------------------------------------------------------------------------------------

//7.4 负权边-------------------------------------------------------------------------------------------------------------------------
//不能将狄克斯特拉算法用于包含负权边的图。在包含负权边的图中，
//要找出最短路径，可使用另一种算法——贝尔曼-福德算法（Bellman-Ford algorithm）。

//7.5 实现----------------------------------------------------------------------------------------------------------------------------
function dijkstra() {
	const graph = new Map();

	graph.set('start', new Map());
	graph.get('start').set('a', 6);
	graph.get('start').set('b', 2);

	graph.set('a', new Map());
	graph.get('a').set('fin', 1);

	graph.set('b', new Map());
	graph.get('b').set('a', 3);
	graph.get('b').set('fin', 5);

	graph.set('fin', new Map());

	const inf = Number.POSITIVE_INFINITY;

	const costs = new Map();
	costs.set('a', 6);
	costs.set('b', 2);
	costs.set('fin', inf);

	const parents = new Map();
	parents.set('a', 'start');
	parents.set('b', 'start');
	parents.set('fin', 'None');

  const processed = [];
}
