/** Chapter2：重构的原则 */
//前一章所举的例子应该已经让你对重构有了一个良好的感觉。现在，我们应该回头看看重构的一些大原则。

//2.1 何谓重构-----------------------------------------------------------------------------------------------------------------
//重构（名词）：对软件内部结构的一种调整，目的是在不改变软件可观察行为的前提下，提高其可理解性，降低其修改成本。
//重构（动词）：使用一系列重构手法，在不改变软件可观察行为的前提下，调整其结构。

//重构的关键在于运用大量微小且保持软件行为的步骤，一步步达成大规模的修改。

//重构之后的代码不一定与重构前行为完全一致。比如说，提炼函数（106）会改变函数调用栈，
//因此程序的性能就会有所改变；改变函数声明（124）和搬移函数（198）等重构经常会改变模块的接口。
//不过就用户应该关心的行为而言，不应该有任何改变。如果我在重构过程中发现了任何 bug，
//重构完成后同样的 bug 应该仍然存在（不过，如果潜在的 bug 还没有被任何人发现，也可以当即把它改掉）。

//重构与性能优化有很多相似之处：两者都需要修改代码，并且两者都不会改变程序的整体功能。
//两者的差别在于其目的：重构是为了让代码“更容易理解，更易于修改”。这可能使程序运行得更快，
//也可能使程序运行得更慢。在性能优化时，我只关心让程序运行得更快，最终得到的代码有可能更难理解和维护，对此我有心理准备。

//2.2 两顶帽子------------------------------------------------------------------------------------------------------------------
//Kent Beck 提出了“两顶帽子”的比喻。
//使用重构技术开发软件时，我把自己的时间分配给两种截然不同的行为：添加新功能和重构。
//添加新功能时，我不应该修改既有代码，只管添加新功能。通过添加测试并让测试正常运行，我可以衡量自己的工作进度。
//重构时我就不能再添加功能，只管调整代码的结构。此时我不应该添加任何测试（除非发现有先前遗漏的东西），
//只在绝对必要（用以处理接口变化）时才修改测试。

//软件开发过程中，我可能会发现自己经常变换帽子。首先我会尝试添加新功能，然后会意识到：
//如果把程序结构改一下，功能的添加会容易得多。于是我换一顶帽子，做一会儿重构工作。程
//序结构调整好后，我又换上原先的帽子，继续添加新功能。新功能正常工作后，
//我又发现自己的编码造成程序难以理解，于是又换上重构帽子……整个过程或许只花 10 分钟，
//但无论何时我都清楚自己戴的是哪一顶帽子，并且明白不同的帽子对编程状态提出的不同要求。

//2.3 为何重构------------------------------------------------------------------------------------------------------------------
//重构是一个工具，它可以（并且应该）用于以下几个目的：

//##重构改进软件的设计
//如果没有重构，程序的内部设计（或者叫架构）会逐渐腐败变质。
//代码结构的流失有累积效应。越难看出代码所代表的设计意图，就越难保护其设计，于是设计就腐败得越快。
//经常性的重构有助于代码维持自己该有的形态。
//代码越多，做正确的修改就越困难，因为有更多代码需要理解。我在这里做了点儿修改，系统却不如预期那样工作，
//因为我没有修改另一处——那里的代码做着几乎完全一样的事情，只是所处环境略有不同。
//消除重复代码，我就可以确定所有事物和行为在代码中只表述一次，这正是优秀设计的根本。

//##重构使软件更容易理解
//我们应该改变一下开发节奏，让代码变得更易于理解。重构可以帮我让代码更易读。开始进行重构前，
//代码可以正常运行，但结构不够理想。在重构上花一点点时间，
//就可以让代码更好地表达自己的意图——更清晰地说出我想要做的。

//##重构帮助找到 bug
//如果对代码进行重构，我就可以深入理解代码的所作所为，并立即把新的理解反映在代码当中。

//##重构提高编程速度
//需要添加新功能时，内部质量良好的软件让我可以很容易找到在哪里修改、如何修改。
//良好的模块划分使我只需要理解代码库的一小部分，就可以做出修改。如果代码很清晰，
//我引入 bug 的可能性就会变小，即使引入了 bug，调试也会容易得多。理想情况下，
//我的代码库会逐步演化成一个平台，在其上可以很容易地构造与其领域相关的新功能。

//通过投入精力改善内部设计，我们增加了软件的耐久性，从而可以更长时间地保持开发的快速

//现在我们可以改善已有代码的设计，因此我们可以先做一个设计，然后不断改善它，
//哪怕程序本身的功能也在不断发生着变化。由于预先做出良好的设计非常困难，
//想要既体面又快速地开发功能，重构必不可少。

//2.4 何时重构--------------------------------------------------------------------------------------------------------------------
//第一次做某件事时只管去做；第二次做类似的事会产生反感，但无论如何还是可以去做；第三次再做类似的事，你就应该重构。

//##预备性重构：让添加新功能更容易
//重构的最佳时机就在添加新功能之前。在动手添加新功能之前，我会看看现有的代码库，
//此时经常会发现：如果对代码结构做一点微调，我的工作会容易得多

//##帮助理解的重构：使代码更易懂
//一旦我需要思考“这段代码到底在做什么”，我就会自问：能不能重构这段代码，令其一目了然？
//如果把对代码的理解植入代码中，这份知识会保存得更久，并且我的同事也能看到。
//在研读代码时，重构会引领我获得更高层面的理解，如果只是阅读代码很难有此领悟。
//有些人以为这些重构只是毫无意义地把玩代码，他们没有意识到，缺少了这些细微的整理，
//他们就无法看到隐藏在一片混乱背后的机遇。

//##捡垃圾式重构
//帮助理解的重构还有一个变体：我已经理解代码在做什么，但发现它做得不好
//如果我发现的垃圾很容易重构，我会马上重构它；如果重构需要花一些精力，
//我可能会拿一张便笺纸把它记下来，完成当下的任务再回来重构它。
//如果每次经过这段代码时都把它变好一点点，积少成多，垃圾总会被处理干净。重构的妙处就在于，
//每个小步骤都不会破坏代码——所以，有时一块垃圾在好几个月之后才终于清理干净，
//但即便每次清理并不完整，代码也不会被破坏。

//##有计划的重构和见机行事的重构
//软件永远不应该被视为“完成”。每当需要新能力时，软件就应该做出相应的改变。越是在已有代码中，这样的改变就越显重要。

//##长期重构

//##复审代码时重构
//在编程的过程中持续不断地进行代码复审。

//##怎么对经理说
//软件开发者都是专业人士。我们的工作就是尽可能快速创造出高效软件。
//我认为最快的方式就是重构，所以我就重构。

//##何时不应该重构
//如果丑陋的代码能被隐藏在一个 API 之下，我就可以容忍它继续保持丑陋。
//只有当我需要理解其工作原理时，对其进行重构才有价值。
//另一种情况是，如果重写比重构还容易，就别重构了。
//这是个困难的决定。如果不花一点儿时间尝试，往往很难真实了解重构一块代码的难度。
//决定到底应该重构还是重写，需要良好的判断力与丰富的经验，

//2.5 重构的挑战------------------------------------------------------------------------------------------------------------------------
//每当有人大力推荐一种技术、工具或者架构时，我总是会观察这东西会遇到哪些挑战，毕竟生活中很少有晴空万里的好事。
//你需要了解一件事背后的权衡取舍，才能决定何时何地应用它。
//我认为重构是一种很有价值的技术，大多数团队都应该更多地重构，但它也不是完全没有挑战的。
//有必要充分了解重构会遇到的挑战，这样才能做出有效应对。

//##延缓新功能开发
//重构的唯一目的就是让我们开发更快，用更少的工作量创造更大的价值。
//在我们这个行业里，重构不足的情况远多于重构过度的情况。换句话说，绝大多数人应该尝试多做重构。
//如果你是一支团队的技术领导，一定要向团队成员表明，你重视改善代码库健康的价值。
//合理判断何时应该重构、何时应该暂时不重构，这样的判断力需要多年经验积累。
//对于重构缺乏经验的年轻人需要有意的指导，才能帮助他们加速经验积累的过程。

//##代码所有权
//很多重构手法不仅会影响一个模块内部，还会影响该模块与系统其他部分的关系
//我推荐团队代码所有制，这样一支团队里的成员都可以修改这个团队拥有的代码，即便最初写代码的是别人。
//程序员可能各自分工负责系统的不同区域，但这种责任应该体现为监控自己责任区内发生的修改，而不是简单粗暴地禁止别人修改。

//##分支
//特性分支/CI
//在使用 CI 时，每个团队成员每天至少向主线集成一次。这个实践避免了任何分支彼此差异太大，从而极大地降低了合并的难度。
//不过 CI 也有其代价：你必须使用相关的实践以确保主线随时处于健康状态，
//必须学会将大功能拆分成小块，还必须使用特性开关（feature toggle，也叫特性旗标，feature flag）将尚未完成又无法拆小的功能隐藏掉。

//##测试
//这里的关键就在于“快速发现错误”。要做到这一点，我的代码应该有一套完备的测试套件，并且运行速度要快，否则我会不愿意频繁运行它。
//也就是说，绝大多数情况下，如果想要重构，我得先有可以自测试的代码[mf-stc]。
//毫不意外，自测试代码与持续集成紧密相关——我们仰赖持续集成来及时捕获分支集成时的语义冲突。
//自测试代码是极限编程的另一个重要组成部分，也是持续交付的关键环节。

//##遗留代码
//没测试就加测试
//就算有了测试，我也不建议你尝试一鼓作气把复杂而混乱的遗留代码重构成漂亮的代码。
//我更愿意随时重构相关的代码：每次触碰一块代码时，我会尝试把它变好一点点——至少要让营地比我到达时更干净。
//如果是一个大系统，越是频繁使用的代码，改善其可理解性的努力就能得到越丰厚的回报。

//##数据库
//与常规的重构不同，很多时候，数据库重构最好是分散到多次生产发布来完成，这样即便某次修改在生产数据库上造成了问题，也比较容易回滚。

//2.6 重构、架构和 YAGNI-------------------------------------------------------------------------------------------------------------------
//把 YAGNI 视为将架构、设计与开发过程融合的一种工作方式，这种工作方式必须有重构作为基础才可靠。
//采用 YAGNI 并不表示完全不用预先考虑架构。总有一些时候，如果缺少预先的思考，重构会难以开展。
//但两者之间的平衡点已经发生了很大的改变：如今我更倾向于等一等，待到对问题理解更充分，再来着手解决。
//演进式架构[Ford et al.]是一门仍在不断发展的学科，架构师们在不断探索有用的模式和实践，充分发挥迭代式架构决策的能力。

//2.7 重构与软件开发过程-----------------------------------------------------------------------------------------------------------------------
//重构起初是作为极限编程（XP）[mf-xp]的一部分被人们采用的，XP 本身就融合了一组不太常见而又彼此关联的实践，
//例如持续集成、自测试代码以及重构（后两者融汇成了测试驱动开发）。

//要真正以敏捷的方式运作项目，团队成员必须在重构上有能力、有热情，他们采用的开发过程必须与常规的、持续的重构相匹配。

//重构的第一块基石是自测试代码。我应该有一套自动化的测试，我可以频繁地运行它们，
//并且我有信心：如果我在编程过程中犯了任何错误，会有测试失败。这块基石如此重要，我会专门用一章篇幅来讨论它。

//如果一支团队想要重构，那么每个团队成员都需要掌握重构技能，能在需要时开展重构，而不会干扰其他人的工作。
//这也是我鼓励持续集成的原因：有了 CI，每个成员的重构都能快速分享给其他同事，不会发生这边在调用一个接口那边却已把这个接口删掉的情况；
//如果一次重构会影响别人的工作，我们很快就会知道。
//自测试的代码也是持续集成的关键环节，所以这三大实践——自测试代码、持续集成、重构——彼此之间有着很强的协同效应。

//有了可靠的技术根基，我们能够极大地压缩“从好点子到生产代码”的周期时间，从而更好地服务客户。
//这些技术实践也会增加软件的可靠性，减少耗费在 bug 上的时间。

//2.8 重构与性能-------------------------------------------------------------------------------------------------------------------------------------
//我并不赞成为了提高设计的纯洁性而忽视性能，把希望寄托于更快的硬件身上也绝非正道。
//已经有很多软件因为速度太慢而被用户拒绝，日益提高的机器速度也只不过略微放宽了速度方面的限制而已。
//但是，换个角度说，虽然重构可能使软件运行更慢，但它也使软件的性能优化更容易。
//除了对性能有严格要求的实时系统，其他任何情况下“编写快速软件”的秘密就是：先写出可调优的软件，然后调优它以求获得足够的速度。

//时间预算法/持续关注法/
//关于性能，一件很有趣的事情是：如果你对大多数程序进行分析，就会发现它把大半时间都耗费在一小半代码身上。
//如果你一视同仁地优化所有代码，90％的优化工作都是白费劲的，因为被你优化的代码大多很少被执行。
//你花时间做优化是为了让程序运行更快，但如果因为缺乏对程序的清楚认识而花费时间，那些时间就都被浪费掉了。

//第三种性能提升法就是利用上述的 90%统计数据。采用这种方法时，我编写构造良好的程序，
//不对性能投以特别的关注，直至进入性能优化阶段——那通常是在开发后期。
//一旦进入该阶段，我再遵循特定的流程来调优程序性能。

//在性能优化阶段，我首先应该用一个度量工具来监控程序的运行，让它告诉我程序中哪些地方大量消耗时间和空间。
//这样我就可以找出性能热点所在的一小段代码。然后我应该集中关注这些性能热点，并使用持续关注法中的优化手段来优化它们。
//由于把注意力都集中在热点上，较少的工作量便可显现较好的成果。即便如此，我还是必须保持谨慎。
//和重构一样，我会小幅度进行修改。每走一步都需要编译、测试，再次度量。
//如果没能提高性能，就应该撤销此次修改。我会继续这个“发现热点，去除热点”的过程，直到获得客户满意的性能为止。

//一个构造良好的程序可从两方面帮助这一优化方式。首先，它让我有比较充裕的时间进行性能调整，
//因为有构造良好的代码在手，我能够更快速地添加功能，也就有更多时间用在性能问题上（准确的度量则保证我把这些时间投在恰当地点）。
//其次，面对构造良好的程序，我在进行性能分析时便有较细的粒度。
//度量工具会把我带入范围较小的代码段中，而性能的调整也比较容易些。由于代码更加清晰，因此我能够更好地理解自己的选择，更清楚哪种调整起关键作用。

//我发现重构可以帮助我写出更快的软件。短期看来，重构的确可能使软件变慢，但它使优化阶段的软件性能调优更容易，最终还是会得到好的效果。

//2.9 重构起源何处----------------------------------------------------------------------------------------------------------------------------------------

//2.10 自动化重构------------------------------------------------------------------------------------------------------------------------------------------

// 2.11 延展阅读---------------------------------------------------------------------------------------------------------------------------------------------
