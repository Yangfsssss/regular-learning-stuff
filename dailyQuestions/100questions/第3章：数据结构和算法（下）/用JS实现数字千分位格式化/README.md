将数字千分位格式化，输出字符串；
如输入数字12050100，输出字符串'12,050,100'；
（注意：逆序判断）

常规思路：
    转换为数组，reverse，每3位拆分；
    使用正则表达式；
    使用字符串拆分；

性能分析：
    使用数组，转换影响性能；
    使用正则表达式，性能较差；
    使用字符串，性能较好 --- 推荐答案；

划重点：
    顺序：从尾到头；
    尽量不要转换数据结构；
    慎用正则表达式；