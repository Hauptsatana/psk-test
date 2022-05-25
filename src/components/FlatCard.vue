<template>
  <!-- Характеристики -->
  <div class="flat-card__container">
    <!-- Тип -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Тип
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.type}}
      </div>
    </div>
    <!-- Площадь -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Площадь
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.square}}
      </div>
    </div>
    <!-- Тип планировки -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Тип планировки
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.planType}}
      </div>
    </div>
    <!-- Номер -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Номер
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.number}}
      </div>
    </div>
    <!-- Этаж -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Этаж
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.floor}}
      </div>
    </div>
    <!-- Цена -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Цена
      </div>
      <div class="flat-card__feature-value">
        {{costFormatted}}
      </div>
    </div>
    <!-- Статус -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Статус
      </div>
      <div class="flat-card__feature-value">
        {{flatInfo.status}}
      </div>
    </div>
    <!-- Особенности -->
    <div class="flat-card__feature-row">
      <div class="flat-card__feature-name">
        Особенности
      </div>
      <div class="flat-card__feature-value">
        <div class="field-checkbox">
          <checkbox id="subsidy" :modelValue="flatInfo.subsidy" :disabled="true" :binary="true" />
          <label for="subsidy">Субсидированная</label>
        </div>
        <div class="field-checkbox">
          <checkbox id="subsidy" :modelValue="flatInfo.marginal" :disabled="true" :binary="true" />
          <label for="subsidy">Маржинальная</label>
        </div>
        <div class="field-checkbox">
          <checkbox id="subsidy" :modelValue="flatInfo.renovation" :disabled="true" :binary="true" />
          <label for="subsidy">С ремонтом</label>
        </div>
        <div class="field-checkbox">
          <checkbox id="subsidy" :modelValue="flatInfo.installment" :disabled="true" :binary="true" />
          <label for="subsidy">С рассрочкой</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Checkbox from 'primevue/checkbox';
import { IFlatInfo } from '@/types/flat';
import { RUBLE } from '@/constants/strings';

export default defineComponent({
  components: {
    Checkbox,
  },
  props: {
    flatInfo: {
      type: Object as PropType<IFlatInfo>,
      required: true,
    },
  },
  computed: {
    costFormatted(): string {
      return `${this.flatInfo.cost} ${RUBLE}`;
    },
  },
});
</script>

<style lang="less">
.flat-card {

  &__container {
    width: 350px;
  }

  &__feature-row {
    display: flex;
    margin-top: 10px;
  }

  &__feature-name {
    width: 150px;
    text-align: right;
    padding-right: 15px;
    font-weight: bold;
  }
}
</style>
