<template>
  <nav id="comparecss-sidenav" class="bootstrap">
        <div class="sidenav-header">
            <h3 class="active">comparecss</h3>
        </div>
        <ul class="list-unstyled components">
            <p>Dummy Heading</p>
            <li class="active">
                <a href="#homeSubmenu" data-toggle="collapse"
                aria-expanded="false" class="dropdown-toggle" @click="buttonClick('Home')">
                Home
                </a>
                <ul class="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick('Badges')">Badges</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick('Buttons')">Buttons</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick('Buttons')">Button groups</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse"
                aria-expanded="false" class="dropdown-toggle" @click="buttonClick('Pages')"
                >Pages
                </a>
                <ul class="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Statistics</a>
            </li>
        </ul>

        <ul class="list-unstyled CTAs">
            <li>
                <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" class="download">Download source</a>
            </li>
            <li>
                <a href="https://bootstrapious.com/p/bootstrap-sidebar" class="article">Back to article</a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">

export default {
  methods: {
    buttonClick(buttonName: string): void {
      this.$emit('sidenav-button-clicked', buttonName);
    },
  },
};
</script>

<style lang="scss" scoped>
#comparecss-sidenav {
    min-width: 250px;
    max-width: 250px;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
    p {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1em;
        font-weight: 300;
        line-height: 1.7em;
        color: #999;
    }

    a,
    a:hover,
    a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    .navbar {
        padding: 15px 10px;
        background: #fff;
        border: none;
        border-radius: 0;
        margin-bottom: 40px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    }

    .navbar-btn {
        box-shadow: none;
        outline: none !important;
        border: none;
    }

    .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px dashed #ddd;
        margin: 40px 0;
    }

    /* ---------------------------------------------------
        sidenav STYLE
    ----------------------------------------------------- */

    .sidenav-header {
        padding: 20px;
        background: #6d7fcc;
    }

    ul.components {
        padding: 20px 0;
        border-bottom: 1px solid #47748b;
    }

    ul p {
        color: #fff;
        padding: 10px;
    }

    ul li a {
        padding: 10px;
        font-size: 1.1em;
        display: block;
    }

    ul li a:hover {
        color: #7386D5;
        background: #fff;
    }

    ul li.active>a,
    a[aria-expanded="true"] {
        color: #fff;
        background: #6d7fcc;
    }

    a[data-toggle="collapse"] {
        position: relative;
    }

    .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    ul ul a {
        font-size: 0.9em !important;
        padding-left: 30px !important;
        background: #6d7fcc;
    }

    ul.CTAs {
        padding: 20px;
    }

    ul.CTAs a {
        text-align: center;
        font-size: 0.9em !important;
        display: block;
        border-radius: 5px;
        margin-bottom: 5px;
    }

    a.download {
        background: #fff;
        color: #7386D5;
    }

    a.article,
    a.article:hover {
        background: #6d7fcc !important;
        color: #fff !important;
    }

    /* ---------------------------------------------------
        MEDIAQUERIES
    ----------------------------------------------------- */

    @media (max-width: 768px) {
            margin-left: -250px;
        .active {
            margin-left: 0;
        }
        #sidenavCollapse span {
            display: none;
        }
    }
}

</style>
