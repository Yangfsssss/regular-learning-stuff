有一个递增的数组[1,2,4,7,11,15]和一个n = 15；
数组中有两个数，和是n。即4 + 11 === 15；
写一个JS函数，找出这两个数；

常规思路：
    嵌套循环，找到一个数，然后去遍历下一个数，求和，判断；
    时间复杂度时O(n^2)，不可用；

利用递增（有序）的特性：
    随便找两个数；
    如果和大于n，则需要向前寻找；
    如果和小于n，则需要向后寻找 --- 二分思想；

    双指针，时间复杂度降低到O(n)；
        定义i指向头，j指向尾，求arr[i] + arr[j]；
        如果大于n，则j需要向前移动；
        如果小于n，则i需要向后移动；

划重点：
    时间复杂度达到O(n^2)，是不可用的算法；
    凡有序，必二分！！！；
    优化嵌套循环，可以考虑“双指针”；