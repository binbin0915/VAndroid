<template>
    <div class="list-view">
        <div v-if="showHint" class="hint-container">
            <el-image :src="require('@/assets/empty.svg')" style="width: 120px; height: 150px;"></el-image>
            <div style="color: #909399;">暂无数据</div>
        </div>
        <div v-else :class="{ 'wrap-list': wrap }">
            <slot></slot>
        </div>
        <div class="bottom-info" v-if="!showHint">
            <div v-if="busy">
                <i class="el-icon-loading"></i>
                <span style="margin-left: 6px;">加载中...</span>
            </div>
            <div v-if="noMore">暂无更多数据</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListView',
    props: {
        busy: {
            type: Boolean,
            default: false
        },
        noMore: {
            type: Boolean,
            default: false
        },
        showHint: {
            type: Boolean,
            default: false
        },
        wrap: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="scss" scoped>
.list-view {
    .hint-container {
        margin-top: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wrap-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    
    .bottom-info {
        color: #909399;
        text-align: center;
        line-height: 60px;
    }
}
</style>