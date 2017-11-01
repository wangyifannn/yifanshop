<template>
<div>
      <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">首页</a>
                <!--面包屑导航也叫路径导航，通过slot定义插槽来代替不同的路径-->
                <!--<span>Goods</span>-->
                <slot></slot>
            </nav>
        </div>
    </div>
    </div>
</template>
