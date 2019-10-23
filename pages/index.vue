<template>
    <div>
        <hero-section></hero-section>

        <section class="section">
            <div class="container">
                <h1 class="title">Featured Courses</h1>
                <div class="columns">
                    <div class="column is-one-quarter">
                        <course-card />
                    </div>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h1 class="title">Featured Articles</h1>
                <div class="columns">
                    <div class="column is-one-quarter">
                        <article-card />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import ArticleCard from "@/components/ArticleCard";
export default {
    components: { HeroSection, CourseCard, ArticleCard }
};
</script>

<style scoped lang="scss">
.links {
    padding-top: 15px;
}
</style>