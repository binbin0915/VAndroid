<template>
    <list-view :busy="busy" :noMore="noMore" :showHint="showHint" style="width: 660px;">
        <article-item v-for="(result, index) in resultList" :key="index" :item="result"></article-item>
    </list-view>
</template>

<script>
import ListView from '@/components/ListView';
import ArticleItem from '@/components/ArticleItem';

import { mapGetters } from 'vuex';
import { globalSearch } from '@/api/search';

export default {
    components: {
        ListView,
        ArticleItem,
    },
    methods: {
        onScroll() {
            if (this.busy || this.noMore) return;
            let scrollView = document.documentElement || document.body;
            if (scrollView.scrollHeight - scrollView.scrollTop <= scrollView.clientHeight) {
                this.search('more', this.currPage, this.searchKey);
            }
        },
        search(state, currPage, key) {
            if (state === 'init') {
                this.resetListState();
                globalSearch(currPage, key).then(res => {
                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        this.resultList = res.data.datas;
                        this.currPage = currPage + 1;
                    } else {
                        this.showHint = true;
                    }
                })
            }
            if (state === 'more') {
                this.busy = true;
                globalSearch(currPage, key).then(res => {
                    this.busy = false;

                    if (res.data.datas != undefined && res.data.datas.length != 0) {
                        this.resultList.push(...res.data.datas);
                        this.currPage = currPage + 1;
                    } else {
                        this.noMore = true;
                    }
                })
            }
        },
        resetListState() {
            this.noMore = false;
            this.showHint = false;
        }
    },
    computed: {
        ...mapGetters([
            'searchKey',
        ])
    },
    watch: {
        searchKey() {
            this.search('init', 0, this.searchKey);
        }
    },
    data() {
        return {
            busy: false,
            noMore: false,
            showHint: false,
            currPage: 0,
            resultList: [],
        }
    },
    created() {
        if (this.searchKey) {
            this.search('init', 0, this.searchKey);
        }
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.onScroll);
    }
}
</script>

