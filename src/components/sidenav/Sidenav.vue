<template>
  <nav id="comparecss-sidenav" class="bootstrap">
        <div class="sidenav-header">
            <h3 class="active">comparecss</h3>
        </div>
        <ul class="list-unstyled components">
            <p>Dummy Heading</p>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.HOMEPAGE)">Homepage</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.WORKSHOP)">Workshop</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.ACCORDIONS)">Accordions</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.ALERTS)">Alerts</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.BADGES)">Badges</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.BREAD_CRUMBS)">Bread crumbs</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.BUTTONS)">Buttons</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.BUTTON_GROUPS)">Button groups</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.CARDS)">Cards</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.DROPDOWNS)">Dropdowns</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.FORMS)">Forms</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.MODALS)">Modals</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.NAVBARS)">Navbars</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.PAGINATION)">Pagination</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.PROGRESS)">Progress</a>
            </li>
            <li>
                <a style="cursor: pointer" @click="buttonClick(NAVBAR_MENU_BUTTONS.COMPONENTS, NAVBAR_SUB_MENU_BUTTONS.TOOLTIPS)">Tooltips</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse"
                aria-expanded="false" class="dropdown-toggle" @click="buttonClick('components', 'Pages')"
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
interface Data {
  NAVBAR_MENU_BUTTONS,
  NAVBAR_SUB_MENU_BUTTONS
}
import { NAVBAR_MENU_BUTTONS } from '../../consts/navbarMenuButtons.enum';
import { NAVBAR_SUB_MENU_BUTTONS } from '../../consts/navbarSubMenuButtons.enum';
import { NavbarButton } from '../../interfaces/navbarButton';

export default {
  methods: {
    buttonClick(navbarMenuButton: NAVBAR_MENU_BUTTONS, navbarSubMenuButton?: NAVBAR_SUB_MENU_BUTTONS): void {
      const navbarButton: NavbarButton = { navbarMenuButton, navbarSubMenuButton };
      this.$emit('sidenav-button-clicked', navbarButton);
    },
  },
  data: (): Data  =>({
    NAVBAR_MENU_BUTTONS,
    NAVBAR_SUB_MENU_BUTTONS
  }),
};
</script>

<style lang="scss" scoped>
$navbar-background:#7a7a7a;
// $navbar-background: #e97b7b
#comparecss-sidenav ul li.active > a[data-v-fcd8c16e], #comparecss-sidenav a[aria-expanded=true][data-v-fcd8c16e] {
  background: $navbar-background;
}
#comparecss-sidenav .sidenav-header[data-v-fcd8c16e] {
  background: $navbar-background;
}
#comparecss-sidenav {
    min-width: 250px;
    max-width: 250px;
    background: $navbar-background;
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
        background:#7a7a7a;
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
        background:#7a7a7a;
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
        background:#7a7a7a;
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
        background:#7a7a7a !important;
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
