<template>

    <el-container>
        <el-main>
            <!-- default-expand-all show-checkbox-->
            <el-tree :data="data4" :props="defaultProps" node-key="id" :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
        </el-main>
        <el-footer>
            <el-button @click="append()" round size="small" icon="el-icon-circle-plus-outline">新增根节点</el-button>
        </el-footer>
    </el-container>

</template>


<script>
let id = 1000;

export default {
    data() {
        return {
            data4: [
                {
                    id: 1,
                    title: "一级 1",
                    hasChild: true,
                    children: [
                        {
                            id: 4,
                            title: "二级 1-1",
                            hasChild: true,
                            children: [
                                {
                                    id: 9,
                                    hasChild: false,
                                    title: "三级 1-1-1",
                                    children: []
                                },
                                {
                                    id: 10,
                                    hasChild: false,
                                    title: "三级 1-1-2",
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: "一级 2",
                    hasChild: true,
                    children: [
                        {
                            id: 5,
                            hasChild: false,
                            title: "二级 2-1",
                            children: []
                        },
                        {
                            id: 6,
                            hasChild: false,
                            title: "二级 2-2",
                            children: []
                        }
                    ]
                },
                {
                    id: 3,
                    title: "一级 3",
                    hasChild: true,
                    children: [
                        {
                            id: 7,
                            hasChild: false,
                            title: "二级 3-1",
                            children: []
                        },
                        {
                            id: 8,
                            hasChild: false,
                            title: "二级 3-2",
                            children: []
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "title",
                isLeaf: (data, node) => {
                    return !data.hasChild;
                }
            }
        };
    },

    methods: {
        append(data) {
            const newChild = { id: id++, title: "New Item", children: [] };

            if (!data) {
                this.data4.push(newChild);
                return;
            }

            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
            return (
                <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                        <span>{node.label}</span>
                    </span>
                    <span>
                        <el-button
                            style="font-size: 12px;"
                            type="text"
                            on-click={() => this.append(data)}
                        >
                            +
                        </el-button>
                        <el-button
                            style="font-size: 12px;"
                            type="text"
                            on-click={() => this.remove(node, data)}
                        >
                            -
                        </el-button>
                    </span>
                </span>
            );
        }
    }
};
</script>
