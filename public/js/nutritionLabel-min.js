/*
 ***************************************************************************************************************************************************+
 * NUTRITIONIX.com                                                                                                                                  |
 *                                                                                                                                                  |
 * This plugin allows you to create a fully customizable nutrition label                                                                            |
 *                                                                                                                                                  |
 * @authors             Leo Joseph Gajitos <leejay22@gmail.com>, Rommel Malang <genesis23rd@gmail.com> and Yurko Fedoriv <yurko.fedoriv@gmail.com>  |
 * @copyright           Copyright (c) 2017 Nutritionix.                                                                                             |
 * @license             This Nutritionix jQuery Nutrition Label is dual licensed under the MIT and GPL licenses.                                    |
 * @link                http://www.nutritionix.com                                                                                                  |
 * @github              http://github.com/nutritionix/nutrition-label                                                                               |
 * @current version     9.0.9                                                                                                                       |
 * @stable version      8.0.15                                                                                                                      |
 * @supported browser   Firefox, Chrome, IE8+                                                                                                       |
 * @description         To be able to create a FDA-style nutrition label with any nutrition data source                                             |
 *                                                                                                                                                  |
 ***************************************************************************************************************************************************+
 */
(function($) {
  $.fn.nutritionLabel = function(option, settings) {
    if (typeof option === "object") {
      settings = option;
      init(settings, $(this));
    } else {
      if (typeof option === "string" && option !== "") {
        if (option === "destroy") {
          new NutritionLabel().destroy($(this));
        } else {
          if (option === "hide") {
            new NutritionLabel().hide($(this));
          } else {
            if (option === "show") {
              new NutritionLabel().show($(this));
            } else {
              var values = [];
              var elements = this.each(function() {
                var data = $(this).data("_nutritionLabel");
                if (data) {
                  if (
                    $.fn.nutritionLabel.defaultSettings[option] !== undefined
                  ) {
                    if (settings !== undefined) {
                      data.settings[option] = settings;
                      init(data.settings, $(this));
                    } else {
                      values.push(data.settings[option]);
                    }
                  }
                } else {
                  if (
                    $.fn.nutritionLabel.defaultSettings[option] !== undefined
                  ) {
                    if (settings !== undefined) {
                      $.fn.nutritionLabel.defaultSettings[option] = settings;
                      init(null, $(this));
                    }
                  }
                }
              });
              if (values.length === 1) {
                return values[0];
              }
              return values.length > 0 ? values : elements;
            }
          }
        }
      } else {
        if (typeof option === "undefined" || option === "") {
          init(settings, $(this));
        }
      }
    }
  };
  $.fn.nutritionLabel.defaultSettings = {
    width: 280,
    allowCustomWidth: false,
    widthCustom: "auto",
    allowNoBorder: false,
    allowFDARounding: false,
    allowGoogleAnalyticsEventLog: false,
    gooleAnalyticsFunctionName: "ga",
    userFunctionNameOnQuantityChange: null,
    userFunctionOnQuantityChange: null,
    hideNotApplicableValues: false,
    hidePercentDailyValues: false,
    brandName: "Brand where this item belongs to",
    scrollLongIngredients: false,
    scrollHeightComparison: 100,
    scrollHeightPixel: 95,
    decimalPlacesForNutrition: 1,
    decimalPlacesForDailyValues: 0,
    decimalPlacesForQuantityTextbox: 1,
    scrollLongItemName: true,
    scrollLongItemNamePixel: 36,
    scrollLongItemNamePixel2018Override: 34,
    showBottomLink: false,
    urlBottomLink: "http://www.nutritionix.com",
    nameBottomLink: "Nutritionix",
    valueServingUnitQuantity: 1,
    valueServingSizeUnit: "",
    showServingUnitQuantityTextbox: true,
    itemName: "Item / Ingredient Name",
    showServingUnitQuantity: true,
    hideTextboxArrows: false,
    originalServingUnitQuantity: 0,
    nutritionValueMultiplier: 1,
    totalContainerQuantity: 1,
    calorieIntake: 2000,
    dailyValueTotalFat: 65,
    dailyValueSatFat: 20,
    dailyValueCholesterol: 300,
    dailyValueSodium: 2400,
    dailyValuePotassium: 3500,
    dailyValuePotassium_2018: 4700,
    dailyValueCarb: 300,
    dailyValueFiber: 25,
    dailyValueCalcium: 1300,
    dailyValueIron: 18,
    dailyValueVitaminD: 20,
    dailyValueAddedSugar: 50,
    dailyValueSugar: 100,
    dailyValueEnergyKcal: 2000,
    dailyValueProtein: 50,
    dailyValueSalt: 6,
    showCalories: true,
    showFatCalories: true,
    showTotalFat: true,
    showSatFat: true,
    showTransFat: true,
    showPolyFat: false,
    showMonoFat: false,
    showCholesterol: true,
    showSodium: true,
    showPotassium: false,
    showPotassium_2018: true,
    showTotalCarb: true,
    showFibers: true,
    showSugars: true,
    showAddedSugars: true,
    showSugarAlcohol: false,
    showProteins: true,
    showVitaminA: true,
    showVitaminC: true,
    showVitaminD: true,
    showCalcium: true,
    showIron: true,
    showDailyTotalFat: true,
    showDailySatFat: true,
    showDailyCholesterol: true,
    showDailySodium: true,
    showDailyPotassium: true,
    showDailyPotassium_2018: true,
    showDailyTotalCarb: true,
    showDailyFibers: true,
    showDailySugars: false,
    showDailyAddedSugars: true,
    showDailyVitaminD: true,
    showDailyCalcium: true,
    showDailyIron: true,
    showDailyProtein: true,
    showDailyEnergy: true,
    showAmountPerServing: true,
    showServingsPerContainer: false,
    showItemName: true,
    showItemNameForUK: false,
    showBrandName: false,
    showIngredients: true,
    showCalorieDiet: false,
    showCustomFooter: false,
    indentSugarAndRemoveBoldStyleFor2018Label: true,
    showDisclaimer: false,
    scrollDisclaimerHeightComparison: 100,
    scrollDisclaimer: 95,
    valueDisclaimer:
      "Please note that these nutrition values are estimated based on our standard serving portions. As food servings may have a slight variance each time you visit, please expect these values to be with in 10% +/- of your actual meal. If you have any questions about our nutrition calculator, please contact Nutritionix.",
    ingredientLabel: "INGREDIENTS:",
    valueCustomFooter: "",
    naCalories: false,
    naFatCalories: false,
    naTotalFat: false,
    naSatFat: false,
    naTransFat: false,
    naPolyFat: false,
    naMonoFat: false,
    naCholesterol: false,
    naSodium: false,
    naPotassium: false,
    naPotassium_2018: false,
    naTotalCarb: false,
    naFibers: false,
    naSugars: false,
    naAddedSugars: false,
    naSugarAlcohol: false,
    naProteins: false,
    naVitaminA: false,
    naVitaminC: false,
    naVitaminD: false,
    naCalcium: false,
    naIron: false,
    valueServingWeightGrams: 0,
    valueServingPerContainer: 1,
    valueCalories: 0,
    valueFatCalories: 0,
    valueTotalFat: 0,
    valueSatFat: 0,
    valueTransFat: 0,
    valuePolyFat: 0,
    valueMonoFat: 0,
    valueCholesterol: 0,
    valueSodium: 0,
    valuePotassium: 0,
    valuePotassium_2018: 0,
    valueTotalCarb: 0,
    valueFibers: 0,
    valueSugars: 0,
    valueAddedSugars: 0,
    valueSugarAlcohol: 0,
    valueProteins: 0,
    valueVitaminA: 0,
    valueVitaminC: 0,
    valueVitaminD: 0,
    valueCalcium: 0,
    valueIron: 0,
    unitCalories: "",
    unitFatCalories: "",
    unitTotalFat:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitSatFat:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitTransFat:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitPolyFat:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitMonoFat:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitCholesterol:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitSodium:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitPotassium:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitPotassium_base:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitPotassium_percent: "%",
    unitTotalCarb:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitFibers:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitSugars:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitAddedSugars:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitSugarAlcohol:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitProteins:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitVitaminA: "%",
    unitVitaminC: "%",
    unitVitaminD_base:
      '<span aria-hidden="true">mcg</span><span class="sr-only"> micrograms</span>',
    unitVitaminD_percent: "%",
    unitCalcium: "%",
    unitCalcium_base:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitCalcium_percent: "%",
    unitIron: "%",
    unitIron_base:
      '<span aria-hidden="true">mg</span><span class="sr-only"> milligrams</span>',
    unitIron_percent: "%",
    unitServingWeight:
      '<span aria-hidden="true">g</span><span class="sr-only"> grams</span>',
    unitEnergy_kj: "kj",
    unitEnergy_kcal: "kcal",
    unitSalt: "g",
    unitGramOrMlForThePer100Part: "g",
    valueCol1CalorieDiet: 2000,
    valueCol2CalorieDiet: 2500,
    valueCol1DietaryTotalFat: 0,
    valueCol2DietaryTotalFat: 0,
    valueCol1DietarySatFat: 0,
    valueCol2DietarySatFat: 0,
    valueCol1DietaryCholesterol: 0,
    valueCol2DietaryCholesterol: 0,
    valueCol1DietarySodium: 0,
    valueCol2DietarySodium: 0,
    valueCol1DietaryPotassium: 0,
    valueCol2DietaryPotassium: 0,
    valueCol1DietaryTotalCarb: 0,
    valueCol2DietaryTotalCarb: 0,
    valueCol1Dietary: 0,
    valueCol2Dietary: 0,
    textNutritionFacts: "Nutrition Facts",
    textDailyValues: "Daily Value",
    textServingSize: "Serving Size:",
    textServingsPerContainer: "Servings Per Container",
    textAmountPerServing: "Amount Per Serving",
    textCalories: "Calories",
    textFatCalories: "Calories from Fat",
    textTotalFat: "Total Fat",
    textSatFat: "Saturated Fat",
    textTransFat: "<em>Trans</em> Fat",
    textPolyFat: "Polyunsaturated Fat",
    textMonoFat: "Monounsaturated Fat",
    textCholesterol: "Cholesterol",
    textSodium: "Sodium",
    textPotassium: "Potassium",
    textTotalCarb: "Total Carbohydrates",
    textFibers: "Dietary Fiber",
    textSugars: "Sugars",
    textAddedSugars1: "Includes ",
    textAddedSugars2: " Added Sugars",
    textSugarAlcohol: "Sugar Alcohol",
    textProteins: "Protein",
    textVitaminA: "Vitamin A",
    textVitaminC: "Vitamin C",
    textVitaminD: "Vitamin D",
    textCalcium: "Calcium",
    textIron: "Iron",
    textNotApplicable: "-",
    ingredientList: "None",
    textPercentDailyPart1: "Percent Daily Values are based on a",
    textPercentDailyPart2: "calorie diet",
    textPercentDaily2018VersionPart1:
      "The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. ",
    textPercentDaily2018VersionPart2:
      " calories a day is used for general nutrition advice.",
    textGoogleAnalyticsEventCategory: "Nutrition Label",
    textGoogleAnalyticsEventActionUpArrow: "Quantity Up Arrow Clicked",
    textGoogleAnalyticsEventActionDownArrow: "Quantity Down Arrow Clicked",
    textGoogleAnalyticsEventActionTextbox: "Quantity Textbox Changed",
    textUKTypicalValues: "Typical Values",
    textUKReferenceIntake: "Reference intake of an average adult",
    textUKPer100: "Per",
    textUKDefaultServingNameIfEmpty: "Serving",
    textDataNotAvailable: "Data not available",
    textAriaLabelIncreaseQuantityArrow: "Increase the Quantity Arrow",
    textAriaLabelDecreaseQuantityArrow: "Decrease the Quantity Arrow",
    textAriaLabelChangeQuantityTextbox: "Change the Quantity Textbox",
    textCalorieDietHtmlLegacyLessThan: "Less than",
    textCalorieDietHtmlLegacyDietary: "Dietary",
    showLegacyVersion: true,
    showUKVersion: false,
    convertEmptyServingNametoServingForUKLabel: true,
    legacyVersion: 1
  };
  function NutritionLabel(settings, $elem) {
    this.nutritionLabel = null;
    this.settings = settings;
    this.$elem = $elem;
    return this;
  }
  function cleanSettings(settings) {
    var numericIndex = [
      "width",
      "calorieIntake",
      "scrollHeightComparison",
      "scrollHeightPixel",
      "scrollLongItemNamePixel",
      "scrollLongItemNamePixel2018Override",
      "decimalPlacesForNutrition",
      "decimalPlacesForDailyValues",
      "decimalPlacesForQuantityTextbox",
      "dailyValueTotalFat",
      "dailyValueSatFat",
      "dailyValueCholesterol",
      "dailyValueSodium",
      "dailyValuePotassium",
      "dailyValueCarb",
      "dailyValueFiber",
      "dailyValueVitaminD",
      "dailyValueCalcium",
      "dailyValueIron",
      "dailyValueSugar",
      "dailyValueSalt",
      "dailyValueEnergyKcal",
      "dailyValueProtein",
      "valueServingUnitQuantity",
      "valueServingSize",
      "valueServingWeightGrams",
      "valueServingPerContainer",
      "valueCalories",
      "valueFatCalories",
      "valueTotalFat",
      "valueSatFat",
      "valueTransFat",
      "valuePolyFat",
      "valueMonoFat",
      "valueCholesterol",
      "valueSodium",
      "valuePotassium",
      "valueTotalCarb",
      "valueFibers",
      "valueSugars",
      "valueProteins",
      "valueVitaminA",
      "valueVitaminC",
      "valueCalcium",
      "valueIron",
      "valueAddedSugars",
      "valueVitaminD",
      "valueSugarAlcohol",
      "valueCol1CalorieDiet",
      "valueCol2CalorieDiet",
      "valueCol1DietaryTotalFat",
      "valueCol2DietaryTotalFat",
      "valueCol1DietarySatFat",
      "valueCol2DietarySatFat",
      "valueCol1DietaryCholesterol",
      "valueCol2DietaryCholesterol",
      "valueCol1DietarySodium",
      "valueCol2DietarySodium",
      "valueCol1DietaryPotassium",
      "valueCol2DietaryPotassium",
      "valueCol1DietaryTotalCarb",
      "valueCol2DietaryTotalCarb",
      "valueCol1Dietary",
      "valueCol2Dietary"
    ];
    $.each(settings, function(index, value) {
      if (jQuery.inArray(index, numericIndex) !== -1) {
        settings[index] = parseFloat(settings[index]);
        if (isNaN(settings[index]) || settings[index] === undefined) {
          settings[index] = 0;
        }
      }
    });
    if (settings.valueServingUnitQuantity < 0) {
      settings.valueServingUnitQuantity = 0;
    }
    return settings;
  }
  function updateNutritionValueWithMultiplier(settings) {
    var nutritionIndex = [
      "valueCalories",
      "valueFatCalories",
      "valueTotalFat",
      "valueSatFat",
      "valueTransFat",
      "valuePolyFat",
      "valueMonoFat",
      "valueCholesterol",
      "valueSodium",
      "valuePotassium",
      "valueTotalCarb",
      "valueFibers",
      "valueSugars",
      "valueProteins",
      "valueVitaminA",
      "valueVitaminC",
      "valueCalcium",
      "valueIron",
      "valueServingWeightGrams",
      "valueAddedSugars",
      "valueVitaminD",
      "valuePotassium_2018",
      "valueSugarAlcohol"
    ];
    $.each(settings, function(index, value) {
      if (jQuery.inArray(index, nutritionIndex) !== -1) {
        settings[index] = parseFloat(settings[index]);
        if (isNaN(settings[index]) || settings[index] === undefined) {
          settings[index] = 0;
        }
        settings[index] =
          parseFloat(settings[index]) *
          parseFloat(settings.valueServingUnitQuantity) *
          parseFloat(settings.nutritionValueMultiplier);
      }
    });
    if (parseFloat(settings.valueServingUnitQuantity) == 0) {
      settings.valueServingPerContainer = 0;
    } else {
      if (
        !isNaN(settings.valueServingPerContainer) &&
        settings.valueServingPerContainer != undefined
      ) {
        settings.valueServingPerContainer =
          parseFloat(settings.totalContainerQuantity) /
          parseFloat(settings.valueServingUnitQuantity);
      }
    }
    return settings;
  }
  function init(settings, $elem) {
    var $settings = $.extend(
      {},
      $.fn.nutritionLabel.defaultSettings,
      settings || {}
    );
    $settings.totalContainerQuantity =
      parseFloat($settings.valueServingPerContainer) *
      parseFloat($settings.valueServingUnitQuantity);
    var $originalCleanSettings = cleanSettings(
      $.extend({}, $.fn.nutritionLabel.defaultSettings, settings || {})
    );
    $originalCleanSettings.totalContainerQuantity =
      parseFloat($originalCleanSettings.valueServingPerContainer) *
      parseFloat($originalCleanSettings.valueServingUnitQuantity);
    $settings = cleanSettings($settings);
    $originalCleanSettings = cleanSettings($originalCleanSettings);
    $settings.nutritionValueMultiplier =
      $settings.valueServingUnitQuantity <= 0
        ? 1
        : 1 / $settings.valueServingUnitQuantity;
    var $updatedsettings = updateNutritionValueWithMultiplier($settings);
    $settings.originalServingUnitQuantity =
      $updatedsettings.valueServingUnitQuantity;
    if ($updatedsettings.valueServingUnitQuantity <= 0) {
      $originalCleanSettings.valueServingUnitQuantity = 1;
      $updatedsettings = updateNutritionValueWithMultiplier(
        $originalCleanSettings
      );
      $updatedsettings.valueServingUnitQuantity = 1;
    }
    var nutritionLabel = new NutritionLabel($updatedsettings, $elem);
    if ($updatedsettings.showLegacyVersion) {
      updateValuesAfterAQuantityChanged(
        $settings,
        nutritionLabel,
        $elem,
        true,
        true,
        false
      );
      if ($settings.showServingUnitQuantityTextbox) {
        if (!$settings.hideTextboxArrows) {
          $("#" + $elem.attr("id")).delegate(
            ".unitQuantityUp",
            "click",
            function(e) {
              e.preventDefault();
              changeQuantityByArrow(
                $(this),
                1,
                updateTheSettingsAfterAnEvent($settings, settings),
                nutritionLabel,
                $elem,
                true,
                false
              );
            }
          );
          $("#" + $elem.attr("id")).delegate(
            ".unitQuantityDown",
            "click",
            function(e) {
              e.preventDefault();
              changeQuantityByArrow(
                $(this),
                -1,
                updateTheSettingsAfterAnEvent($settings, settings),
                nutritionLabel,
                $elem,
                true,
                false
              );
            }
          );
        }
        $("#" + $elem.attr("id")).delegate(
          ".unitQuantityBox",
          "change",
          function(e) {
            e.preventDefault();
            changeQuantityTextbox(
              $(this),
              updateTheSettingsAfterAnEvent($settings, settings),
              nutritionLabel,
              $elem,
              true,
              false
            );
          }
        );
        $("#" + $elem.attr("id")).delegate(
          ".unitQuantityBox",
          "keydown",
          function(e) {
            if (e.keyCode == 13) {
              e.preventDefault();
              changeQuantityTextbox(
                $(this),
                updateTheSettingsAfterAnEvent($settings, settings),
                nutritionLabel,
                $elem,
                true,
                false
              );
            }
          }
        );
      }
    } else {
      if ($updatedsettings.showUKVersion) {
        updateValuesAfterAQuantityChanged(
          $settings,
          nutritionLabel,
          $elem,
          false,
          true,
          true
        );
        if ($settings.showServingUnitQuantityTextbox) {
          if (!$settings.hideTextboxArrows) {
            $("#" + $elem.attr("id")).delegate(
              ".uk_nf-unitQuantityUp",
              "click",
              function(e) {
                e.preventDefault();
                changeQuantityByArrow(
                  $(this),
                  1,
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  true
                );
              }
            );
            $("#" + $elem.attr("id")).delegate(
              ".uk_nf-unitQuantityDown",
              "click",
              function(e) {
                e.preventDefault();
                changeQuantityByArrow(
                  $(this),
                  -1,
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  true
                );
              }
            );
          }
          $("#" + $elem.attr("id")).delegate(
            ".uk_nf-unitQuantityBox",
            "change",
            function(e) {
              e.preventDefault();
              changeQuantityTextbox(
                $(this),
                updateTheSettingsAfterAnEvent($settings, settings),
                nutritionLabel,
                $elem,
                false,
                true
              );
            }
          );
          $("#" + $elem.attr("id")).delegate(
            ".uk_nf-unitQuantityBox",
            "keydown",
            function(e) {
              if (e.keyCode == 13) {
                e.preventDefault();
                changeQuantityTextbox(
                  $(this),
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  true
                );
              }
            }
          );
        }
      } else {
        updateValuesAfterAQuantityChanged(
          $settings,
          nutritionLabel,
          $elem,
          false,
          true,
          false
        );
        if ($settings.showServingUnitQuantityTextbox) {
          if (!$settings.hideTextboxArrows) {
            $("#" + $elem.attr("id")).delegate(
              "div.nf-unitQuantityUp",
              "click",
              function(e) {
                e.preventDefault();
                changeQuantityByArrow(
                  $(this),
                  1,
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  false
                );
              }
            );
            $("#" + $elem.attr("id")).delegate(
              "div.nf-unitQuantityDown",
              "click",
              function(e) {
                e.preventDefault();
                changeQuantityByArrow(
                  $(this),
                  -1,
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  false
                );
              }
            );
          }
          $("#" + $elem.attr("id")).delegate(
            ".nf-unitQuantityBox",
            "change",
            function(e) {
              e.preventDefault();
              changeQuantityTextbox(
                $(this),
                updateTheSettingsAfterAnEvent($settings, settings),
                nutritionLabel,
                $elem,
                false,
                false
              );
            }
          );
          $("#" + $elem.attr("id")).delegate(
            ".nf-unitQuantityBox",
            "keydown",
            function(e) {
              if (e.keyCode == 13) {
                e.preventDefault();
                changeQuantityTextbox(
                  $(this),
                  updateTheSettingsAfterAnEvent($settings, settings),
                  nutritionLabel,
                  $elem,
                  false,
                  false
                );
              }
            }
          );
        }
      }
    }
    $elem.data("_nutritionLabel", nutritionLabel);
  }
  function updateTheSettingsAfterAnEvent($localSettings, localSettings) {
    var $localSettingsHolder = cleanSettings(
      $.extend({}, $.fn.nutritionLabel.defaultSettings, localSettings || {})
    );
    $localSettingsHolder.originalServingUnitQuantity =
      $localSettings.originalServingUnitQuantity;
    $localSettingsHolder.totalContainerQuantity =
      $localSettings.totalContainerQuantity;
    $localSettingsHolder.nutritionValueMultiplier =
      $localSettingsHolder.valueServingUnitQuantity <= 0
        ? 1
        : 1 / $localSettingsHolder.valueServingUnitQuantity;
    return $localSettingsHolder;
  }
  function addScrollToItemDiv(
    $elem,
    $settings,
    localNameClass,
    forLegacyLabel
  ) {
    var local_scrollLongItemNamePixel = parseInt(
      $settings.scrollLongItemNamePixel
    );
    if (!forLegacyLabel) {
      local_scrollLongItemNamePixel = parseInt(
        $settings.scrollLongItemNamePixel2018Override
      );
    }
    if (
      $("#" + $elem.attr("id") + " ." + localNameClass + ".inline").val() !=
      undefined
    ) {
      if (
        $("#" + $elem.attr("id") + " ." + localNameClass + ".inline").height() >
        local_scrollLongItemNamePixel + 1
      ) {
        $("#" + $elem.attr("id") + " ." + localNameClass + ".inline").css({
          "margin-left": "3.90em",
          height: local_scrollLongItemNamePixel + "px",
          "overflow-y": "auto"
        });
      }
    } else {
      if (forLegacyLabel) {
        if (
          $("#" + $elem.attr("id") + " ." + localNameClass).height() >
          local_scrollLongItemNamePixel + 1
        ) {
          $("#" + $elem.attr("id") + " ." + localNameClass).css({
            height: local_scrollLongItemNamePixel + "px",
            "overflow-y": "auto"
          });
        }
      } else {
        if (
          $("#" + $elem.attr("id") + " ." + localNameClass + " div").height() >=
          local_scrollLongItemNamePixel + 1
        ) {
          $("#" + $elem.attr("id") + " ." + localNameClass + " div").css({
            height: local_scrollLongItemNamePixel + "px",
            "overflow-y": "auto"
          });
        }
      }
    }
  }
  function notApplicableHover($elem) {
    if ($elem.attr("id") !== undefined && $elem.attr("id") !== "") {
      $("#" + $elem.attr("id") + " .notApplicable").hover(
        function() {
          $("#" + $elem.attr("id") + " .naTooltip")
            .css({
              top: $(this).position().top + "px",
              left: $(this).position().left + 10 + "px"
            })
            .show();
        },
        function() {
          $("#" + $elem.attr("id") + " .naTooltip").hide();
        }
      );
    } else {
      $("#" + $elem.attr("id") + " .notApplicable").hover(
        function() {
          $(".naTooltip")
            .css({
              top: $(this).position().top + "px",
              left: $(this).position().left + 10 + "px"
            })
            .show();
        },
        function() {
          $(".naTooltip").hide();
        }
      );
    }
  }
  function updateScrollingFeature(
    $localElem,
    $localSettings,
    localIDToScroll,
    localScrollHeightComparison,
    localScrollHeight
  ) {
    if ($localElem.attr("id") !== undefined && $localElem.attr("id") !== "") {
      $parentElement = $(
        "#" + $localElem.attr("id") + " #" + localIDToScroll
      ).parent();
    } else {
      $parentElement = $("#" + localIDToScroll).parent();
    }
    if ($parentElement.innerHeight() > localScrollHeightComparison) {
      $parentElement
        .addClass("scroll")
        .css({ height: localScrollHeight + "px" });
    }
  }
  function updateValuesAfterAQuantityChanged(
    $localSettings,
    nutritionLabel,
    $elem,
    forLegacyLabel,
    forInitialization,
    forUKLabel
  ) {
    var ingredientListID = "ingredientList";
    var calcDisclaimerTextID = "calcDisclaimerText";
    var nameElementClass = "name";
    if (!forLegacyLabel && !forUKLabel) {
      ingredientListID = "nf-ingredientList";
      calcDisclaimerTextID = "nf-calcDisclaimerText";
      nameElementClass = "nf-item-name";
    } else {
      if (!forLegacyLabel && forUKLabel) {
        ingredientListID = "uk_nf-ingredient-statement";
        calcDisclaimerTextID = "uk_nf-disclaimer";
      }
    }
    if (!forInitialization) {
      $localSettings = updateNutritionValueWithMultiplier($localSettings);
      nutritionLabel = new NutritionLabel($localSettings, $elem);
    }
    if (forLegacyLabel) {
      $elem.html(nutritionLabel.generateLegacy());
    } else {
      if (forUKLabel) {
        $elem.html(nutritionLabel.generateUK());
      } else {
        $elem.html(nutritionLabel.generate2018());
      }
    }
    if (
      $localSettings.showIngredients &&
      $localSettings.scrollLongIngredients
    ) {
      updateScrollingFeature(
        $elem,
        $localSettings,
        ingredientListID,
        $localSettings.scrollHeightComparison,
        $localSettings.scrollHeightPixel
      );
    }
    if ($localSettings.showDisclaimer) {
      updateScrollingFeature(
        $elem,
        $localSettings,
        calcDisclaimerTextID,
        $localSettings.scrollDisclaimerHeightComparison,
        $localSettings.scrollDisclaimer
      );
    }
    notApplicableHover($elem);
    if (!forUKLabel) {
      if ($localSettings.scrollLongItemName) {
        addScrollToItemDiv(
          $elem,
          $localSettings,
          nameElementClass,
          forLegacyLabel
        );
      }
    }
    if (!forInitialization) {
      return $localSettings;
    }
  }
  function handleQuantityChange(
    $localSettings,
    source,
    previousValue,
    newValue
  ) {
    var handler;
    if ($localSettings.userFunctionOnQuantityChange) {
      handler = $localSettings.userFunctionOnQuantityChange;
    } else {
      if ($localSettings.userFunctionNameOnQuantityChange) {
        handler = window[$localSettings.userFunctionNameOnQuantityChange];
      }
    }
    if (typeof handler === "function") {
      handler(source, previousValue, newValue);
    }
  }
  function changeQuantityTextbox(
    $thisTextbox,
    $localSettings,
    nutritionLabel,
    $elem,
    forLegacyLabel,
    forUKLabel
  ) {
    var nixLabelBeforeQuantityID = "nixLabelBeforeQuantity";
    if (!forLegacyLabel & !forUKLabel) {
      nixLabelBeforeQuantityID = "nf-nixLabelBeforeQuantity";
    } else {
      if (!forLegacyLabel & forUKLabel) {
        nixLabelBeforeQuantityID = "uk_nf-nixLabelBeforeQuantity";
      }
    }
    var previousValue = parseFloat(
      $("#" + $elem.attr("id") + " #" + nixLabelBeforeQuantityID).val()
    );
    textBoxValue = !regIsPosNumber($thisTextbox.val())
      ? previousValue
      : parseFloat($thisTextbox.val());
    $thisTextbox.val(
      textBoxValue.toFixed($localSettings.decimalPlacesForQuantityTextbox)
    );
    $localSettings.valueServingUnitQuantity = textBoxValue;
    $localSettings = updateValuesAfterAQuantityChanged(
      $localSettings,
      nutritionLabel,
      $elem,
      forLegacyLabel,
      false,
      forUKLabel
    );
    if ($localSettings.allowGoogleAnalyticsEventLog) {
      window[$localSettings.gooleAnalyticsFunctionName](
        "send",
        "event",
        $localSettings.textGoogleAnalyticsEventCategory,
        $localSettings.textGoogleAnalyticsEventActionTextbox
      );
    }
    handleQuantityChange(
      $localSettings,
      "textbox",
      previousValue.toFixed($localSettings.decimalPlacesForQuantityTextbox),
      textBoxValue.toFixed($localSettings.decimalPlacesForQuantityTextbox)
    );
  }
  function changeQuantityByArrow(
    $thisQuantity,
    changeValueBy,
    $localSettings,
    nutritionLabel,
    $elem,
    forLegacyLabel,
    forUKLabel
  ) {
    var unitQuantityBoxClass = "unitQuantityBox";
    if (!forLegacyLabel & !forUKLabel) {
      unitQuantityBoxClass = "nf-unitQuantityBox";
    } else {
      if (!forLegacyLabel & forUKLabel) {
        unitQuantityBoxClass = "uk_nf-unitQuantityBox";
      }
    }
    var currentQuantity = parseFloat(
      $thisQuantity
        .parent()
        .parent()
        .find("input." + unitQuantityBoxClass)
        .val()
    );
    if (isNaN(currentQuantity)) {
      currentQuantity = 1;
    }
    var beforeCurrentQuantityWasChanged = currentQuantity;
    if (currentQuantity <= 1 && changeValueBy == -1) {
      changeValueBy = -0.5;
      currentQuantity += changeValueBy;
    } else {
      if (currentQuantity < 1 && changeValueBy == 1) {
        changeValueBy = 0.5;
        currentQuantity += changeValueBy;
      } else {
        if (
          currentQuantity <= 2 &&
          currentQuantity > 1 &&
          changeValueBy == -1
        ) {
          currentQuantity = 1;
        } else {
          currentQuantity += changeValueBy;
        }
      }
    }
    if (currentQuantity < 0) {
      currentQuantity = 0;
    }
    $thisQuantity
      .parent()
      .parent()
      .find("input." + unitQuantityBoxClass)
      .val(
        currentQuantity.toFixed($localSettings.decimalPlacesForQuantityTextbox)
      );
    $localSettings.valueServingUnitQuantity = currentQuantity;
    $localSettings = updateValuesAfterAQuantityChanged(
      $localSettings,
      nutritionLabel,
      $elem,
      forLegacyLabel,
      false,
      forUKLabel
    );
    if ($localSettings.allowGoogleAnalyticsEventLog) {
      if (changeValueBy > 0) {
        window[$localSettings.gooleAnalyticsFunctionName](
          "send",
          "event",
          $localSettings.textGoogleAnalyticsEventCategory,
          $localSettings.textGoogleAnalyticsEventActionUpArrow
        );
      } else {
        window[$localSettings.gooleAnalyticsFunctionName](
          "send",
          "event",
          $localSettings.textGoogleAnalyticsEventCategory,
          $localSettings.textGoogleAnalyticsEventActionDownArrow
        );
      }
    }
    handleQuantityChange(
      $localSettings,
      changeValueBy > 0 ? "up arrow" : "down arrow",
      beforeCurrentQuantityWasChanged,
      currentQuantity
    );
  }
  function roundToNearestNum(input, nearest) {
    return nearest < 0
      ? Math.round(input * nearest) / nearest
      : Math.round(input / nearest) * nearest;
  }
  function roundCalories(toRound, decimalPlace) {
    toRound = roundCaloriesRule(toRound);
    if (toRound > 0) {
      toRound = parseFloat(toRound.toFixed(decimalPlace));
    }
    return toRound;
  }
  function roundFat(toRound, decimalPlace) {
    toRound = roundFatRule(toRound);
    if (toRound > 0) {
      toRound = parseFloat(toRound.toFixed(decimalPlace));
    }
    return toRound;
  }
  function roundSodium(toRound, decimalPlace) {
    toRound = roundSodiumRule(toRound);
    if (toRound > 0) {
      toRound = parseFloat(toRound.toFixed(decimalPlace));
    }
    return toRound;
  }
  function roundPotassium(toRound, decimalPlace) {
    toRound = roundPotassiumRule(toRound);
    if (toRound > 0) {
      toRound = parseFloat(toRound.toFixed(decimalPlace));
    }
    return toRound;
  }
  function roundCholesterol(toRound, decimalPlace) {
    var normalVersion = true;
    var roundResult = roundCholesterolRule(toRound);
    if (roundResult === false) {
      normalVersion = false;
    } else {
      toRound = roundResult;
    }
    if (normalVersion) {
      if (toRound > 0) {
        toRound = parseFloat(toRound.toFixed(decimalPlace));
      }
    } else {
      toRound = "< 5";
    }
    return toRound;
  }
  function roundCarbFiberSugarProtein(toRound, decimalPlace) {
    var normalVersion = true;
    var roundResult = roundCarbFiberSugarProteinRule(toRound);
    if (roundResult === false) {
      normalVersion = false;
    } else {
      toRound = roundResult;
    }
    if (normalVersion) {
      if (toRound > 0) {
        toRound = parseFloat(toRound.toFixed(decimalPlace));
      }
    } else {
      toRound = "< 1";
    }
    return toRound;
  }
  function roundCaloriesRule(toRound) {
    if (toRound < 5) {
      return 0;
    } else {
      if (toRound <= 50) {
        return roundToNearestNum(toRound, 5);
      }
    }
    return roundToNearestNum(toRound, 10);
  }
  function roundFatRule(toRound) {
    if (toRound < 0.5) {
      return 0;
    } else {
      if (toRound < 5) {
        return roundToNearestNum(toRound, 0.5);
      }
    }
    return roundToNearestNum(toRound, 1);
  }
  function roundSodiumRule(toRound) {
    if (toRound < 5) {
      return 0;
    } else {
      if (toRound <= 140) {
        return roundToNearestNum(toRound, 5);
      }
    }
    return roundToNearestNum(toRound, 10);
  }
  function roundPotassiumRule(toRound) {
    if (toRound < 5) {
      return 0;
    } else {
      if (toRound <= 140) {
        return roundToNearestNum(toRound, 5);
      }
    }
    return roundToNearestNum(toRound, 10);
  }
  function roundCholesterolRule(toRound) {
    if (toRound < 2) {
      return 0;
    } else {
      if (toRound <= 5) {
        return false;
      }
    }
    return roundToNearestNum(toRound, 5);
  }
  function roundCarbFiberSugarProteinRule(toRound) {
    if (toRound < 0.5) {
      return 0;
    } else {
      if (toRound < 1) {
        return false;
      }
    }
    return roundToNearestNum(toRound, 1);
  }
  function roundVitaminsCalciumIron(toRound) {
    if (toRound > 0) {
      if (toRound < 10) {
        return roundToNearestNum(toRound, 2);
      } else {
        if (toRound < 50) {
          return roundToNearestNum(toRound, 5);
        }
      }
      return roundToNearestNum(toRound, 10);
    }
    return 0;
  }
  function roundForUKLabelTotalFatCarbsSugarFiberProtein(toRound) {
    var normalVersion = true;
    var roundResult = roundForUKLabelTotalFatCarbsSugarFiberProteinRule(
      toRound
    );
    if (roundResult === false) {
      normalVersion = false;
    } else {
      toRound = roundResult;
    }
    if (normalVersion && toRound == 0) {
      toRound = "< 0.5";
    }
    return toRound;
  }
  function roundForUKLabelTotalFatCarbsSugarFiberProteinRule(toRound) {
    if (toRound <= 0.5) {
      return 0;
    } else {
      if (toRound < 10) {
        return parseFloat(roundToNearestNum(toRound, 0.1).toFixed(1));
      }
    }
    return parseFloat(roundToNearestNum(toRound, 1).toFixed());
  }
  function roundForUKLabelSatFat(toRound) {
    var normalVersion = true;
    var roundResult = roundForUKLabelSatFatRule(toRound);
    if (roundResult === false) {
      normalVersion = false;
    } else {
      toRound = roundResult;
    }
    if (normalVersion && toRound == 0) {
      toRound = "< 0.1";
    }
    return toRound;
  }
  function roundForUKLabelSatFatRule(toRound) {
    if (toRound <= 0.1) {
      return 0;
    } else {
      if (toRound < 10) {
        return parseFloat(roundToNearestNum(toRound, 0.1).toFixed(1));
      }
    }
    return parseFloat(roundToNearestNum(toRound, 1).toFixed());
  }
  function roundForUKLabelSalt(toRound) {
    var normalVersion = true;
    var roundResult = roundForUKLabelSaltRule(toRound);
    if (roundResult === false) {
      normalVersion = false;
    } else {
      toRound = roundResult;
    }
    if (normalVersion && toRound == 0) {
      toRound = "< 0.01";
    }
    return toRound;
  }
  function roundForUKLabelSaltRule(toRound) {
    if (toRound <= 0.0125) {
      return 0;
    } else {
      if (toRound < 1) {
        return parseFloat(roundToNearestNum(toRound, 0.01).toFixed(2));
      }
    }
    return parseFloat(roundToNearestNum(toRound, 0.1).toFixed(1));
  }
  function regIsPosNumber(fData) {
    return new RegExp("(^[0-9]+[.]?[0-9]+$)|(^[0-9]+$)").test(fData);
  }
  function itemNameHtmlLegacy($localSettings) {
    for (x = 1; x < 5; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var tabTemp = localTab1;
    var localNutritionLabel = (itemNameClass = "");
    if ($localSettings.showServingUnitQuantityTextbox) {
      if (
        $localSettings.valueServingSizeUnit == null ||
        $localSettings.valueServingSizeUnit == "" ||
        ($localSettings.valueServingSizeUnit !== "" &&
          $localSettings.valueServingSizeUnit !== null &&
          $localSettings.originalServingUnitQuantity <= 0)
      ) {
        localNutritionLabel += localTab1 + '<div class="cf">\n';
        localNutritionLabel +=
          localTab2 + '<div class="rel servingSizeField">\n';
        var textboxClass = "unitQuantityBox";
        if (!$localSettings.hideTextboxArrows) {
          localNutritionLabel += localTab3 + '<div class="setter">\n';
          localNutritionLabel +=
            localTab4 +
            '<a href="' +
            $localSettings.textAriaLabelIncreaseQuantityArrow +
            '" class="unitQuantityUp" ';
          localNutritionLabel +=
            'aria-label="' +
            $localSettings.textAriaLabelIncreaseQuantityArrow +
            '" rel="nofollow" tabindex="0"></a>\n';
          localNutritionLabel +=
            localTab4 +
            '<a href="' +
            $localSettings.textAriaLabelDecreaseQuantityArrow +
            '" class="unitQuantityDown" ';
          localNutritionLabel +=
            'aria-label="' +
            $localSettings.textAriaLabelDecreaseQuantityArrow +
            '" rel="nofollow" tabindex="0"></a>\n';
          localNutritionLabel +=
            localTab3 + '</div><!-- closing class="setter" -->\n\n';
        } else {
          textboxClass = "unitQuantityBox arrowsAreHidden";
        }
        localNutritionLabel +=
          localTab3 +
          '<input type="text" value="' +
          parseFloat(
            $localSettings.valueServingUnitQuantity.toFixed(
              $localSettings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" class="' +
          textboxClass +
          '" aria-label="' +
          $localSettings.textAriaLabelChangeQuantityTextbox +
          '">\n';
        localNutritionLabel +=
          localTab3 +
          '<input type="hidden" value="' +
          parseFloat(
            $localSettings.valueServingUnitQuantity.toFixed(
              $localSettings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" id="nixLabelBeforeQuantity">\n';
        localNutritionLabel +=
          localTab2 + '</div><!-- closing class="servingSizeField" -->\n\n';
        tabTemp = localTab2;
        var itemNameClass = "inline";
      }
    }
    localNutritionLabel +=
      tabTemp + '<div class="name ' + itemNameClass + '" tabindex="0">';
    localNutritionLabel += $localSettings.itemName;
    if (
      $localSettings.showBrandName &&
      $localSettings.brandName != null &&
      $localSettings.brandName != ""
    ) {
      localNutritionLabel += " - " + $localSettings.brandName;
    }
    localNutritionLabel += "</div>\n";
    if ($localSettings.showServingUnitQuantityTextbox) {
      if (
        $localSettings.valueServingSizeUnit == null ||
        $localSettings.valueServingSizeUnit == "" ||
        ($localSettings.valueServingSizeUnit !== "" &&
          $localSettings.valueServingSizeUnit !== null &&
          $localSettings.originalServingUnitQuantity <= 0)
      ) {
        localNutritionLabel +=
          localTab1 + '</div><!-- closing class="cf" -->\n\n';
      }
    }
    return localNutritionLabel;
  }
  function sevingUnitQuantityHtmlLegacy($localSettings) {
    for (x = 1; x < 6; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localServingSizeIsHidden = (localServingContainerIsHidden = false);
    var localNutritionLabel = "";
    if ($localSettings.showServingUnitQuantity) {
      localNutritionLabel += localTab1 + '<div class="serving" tabIndex="0">\n';
      if ($localSettings.originalServingUnitQuantity > 0) {
        localNutritionLabel += localTab2 + '<div class="cf">\n';
        localNutritionLabel +=
          localTab3 +
          '<div class="servingSizeText fl">' +
          $localSettings.textServingSize +
          "</div>\n";
        localNutritionLabel += $localSettings.showServingUnitQuantityTextbox
          ? ""
          : localTab3 +
            '<div class="servingUnitQuantity fl" itemprop="servingSize">' +
            parseFloat(
              $localSettings.originalServingUnitQuantity.toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            ) +
            "</div>\n";
        var unitAddedClass = "";
        var gramsAddedClass = "";
        if (
          $localSettings.valueServingSizeUnit !== "" &&
          $localSettings.valueServingSizeUnit !== null
        ) {
          if (
            $localSettings.showServingUnitQuantityTextbox &&
            $localSettings.valueServingSizeUnit != null &&
            $localSettings.valueServingSizeUnit != ""
          ) {
            unitAddedClass = "unitHasTextbox";
            gramsAddedClass = "gramsHasTextbox";
            localNutritionLabel +=
              localTab3 + '<div class="rel servingSizeField fl">\n';
            var textboxClass = "unitQuantityBox";
            if (!$localSettings.hideTextboxArrows) {
              localNutritionLabel += localTab4 + '<div class="setter">\n';
              localNutritionLabel +=
                localTab5 +
                '<a href="' +
                $localSettings.textAriaLabelIncreaseQuantityArrow +
                '" class="unitQuantityUp" ';
              localNutritionLabel +=
                'aria-label="' +
                $localSettings.textAriaLabelIncreaseQuantityArrow +
                '" rel="nofollow" tabindex="0"></a>\n';
              localNutritionLabel +=
                localTab5 +
                '<a href="' +
                $localSettings.textAriaLabelDecreaseQuantityArrow +
                '" class="unitQuantityDown" ';
              localNutritionLabel +=
                'aria-label="' +
                $localSettings.textAriaLabelDecreaseQuantityArrow +
                '" rel="nofollow" tabindex="0"></a>\n';
              localNutritionLabel +=
                localTab4 + '</div><!-- closing class="setter" -->\n\n';
            } else {
              textboxClass = "unitQuantityBox arrowsAreHidden";
            }
            localNutritionLabel +=
              localTab4 +
              '<input type="text" value="' +
              parseFloat(
                $localSettings.valueServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForQuantityTextbox
                )
              ) +
              '" class="' +
              textboxClass +
              '" aria-label="' +
              $localSettings.textAriaLabelChangeQuantityTextbox +
              '">\n';
            localNutritionLabel +=
              localTab4 +
              '<input type="hidden" value="' +
              parseFloat(
                $localSettings.valueServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForQuantityTextbox
                )
              ) +
              '" id="nixLabelBeforeQuantity">\n';
            localNutritionLabel +=
              localTab3 + '</div><!-- closing class="servingSizeField" -->\n\n';
          } else {
            if (
              $localSettings.originalServingUnitQuantity > 0 &&
              $localSettings.showServingUnitQuantityTextbox
            ) {
              localNutritionLabel +=
                localTab3 +
                '<div class="servingUnitQuantity" itemprop="servingSize">' +
                parseFloat(
                  $localSettings.originalServingUnitQuantity.toFixed(
                    $localSettings.decimalPlacesForNutrition
                  )
                ) +
                "</div>\n";
            }
          }
          localNutritionLabel +=
            localTab3 +
            '<div class="servingUnit fl ' +
            unitAddedClass +
            '">' +
            $localSettings.valueServingSizeUnit +
            ($localSettings.legacyVersion == 1 ? "</div>\n" : "");
        } else {
          if (
            $localSettings.originalServingUnitQuantity > 0 &&
            $localSettings.showServingUnitQuantityTextbox
          ) {
            localNutritionLabel +=
              localTab3 +
              '<div class="servingUnitQuantity fl" itemprop="servingSize">' +
              parseFloat(
                $localSettings.originalServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForNutrition
                )
              ) +
              "</div>\n";
          }
        }
        if ($localSettings.valueServingWeightGrams > 0) {
          localNutritionLabel +=
            localTab3 +
            "<" +
            ($localSettings.legacyVersion == 1 ? "div" : "span") +
            ' class="servingWeightGrams ' +
            ($localSettings.legacyVersion == 1 ? "fl" : "") +
            " " +
            gramsAddedClass +
            '">(<span itemprop="servingSize">' +
            parseFloat(
              $localSettings.valueServingWeightGrams.toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            ) +
            $localSettings.unitServingWeight +
            "</span>)\n</" +
            ($localSettings.legacyVersion == 1 ? "div" : "span") +
            ">\n";
        }
        localNutritionLabel +=
          localTab3 + ($localSettings.legacyVersion == 1 ? "" : "</div>\n");
        localNutritionLabel +=
          localTab2 + '</div><!-- closing class="cf" -->\n\n';
      } else {
        localServingSizeIsHidden = true;
      }
      if ($localSettings.showServingsPerContainer) {
        if ($localSettings.valueServingPerContainer > 0) {
          localNutritionLabel +=
            localTab2 +
            '<div tabindex="0">' +
            $localSettings.textServingsPerContainer +
            " " +
            parseFloat(
              $localSettings.valueServingPerContainer.toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            ) +
            "</div>\n";
        } else {
          localServingContainerIsHidden = true;
        }
      } else {
        localServingContainerIsHidden = true;
      }
      localNutritionLabel +=
        localTab1 + '</div><!-- closing class="serving" -->\n\n';
    }
    return {
      servingSizeIsHidden: localServingSizeIsHidden,
      servingContainerIsHidden: localServingContainerIsHidden,
      nutritionLabel: localNutritionLabel
    };
  }
  function calorieDietHtmlLegacy($localSettings) {
    for (x = 2; x < 6; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localNutritionLabel =
      localTab2 + '<table class="tblCalorieDiet" aria-hidden="true">\n';
    localNutritionLabel += localTab3 + "<thead>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel += localTab5 + "<th>&nbsp;</th>\n";
    localNutritionLabel +=
      localTab5 + "<th>" + $localSettings.textCalories + "</th>\n";
    localNutritionLabel +=
      localTab5 + "<th>" + $localSettings.valueCol1CalorieDiet + "</th>\n";
    localNutritionLabel +=
      localTab5 + "<th>" + $localSettings.valueCol2CalorieDiet + "</th>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab3 + "</thead>\n";
    localNutritionLabel += localTab3 + "<tbody>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.textTotalFat + "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.textCalorieDietHtmlLegacyLessThan +
      "</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol1DietaryTotalFat + "g</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol2DietaryTotalFat + "g</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>&nbsp;&nbsp; " + $localSettings.textSatFat + "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.textCalorieDietHtmlLegacyLessThan +
      "</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol1DietarySatFat + "g</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol2DietarySatFat + "g</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.textCholesterol + "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.textCalorieDietHtmlLegacyLessThan +
      "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol1DietaryCholesterol +
      "mg</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol2DietaryCholesterol +
      "mg</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.textSodium + "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.textCalorieDietHtmlLegacyLessThan +
      "</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol1DietarySodium + "mg</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol2DietarySodium + "mg</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.textPotassium + "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.textCalorieDietHtmlLegacyLessThan +
      "</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol1DietaryPotassium +
      "mg</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol2DietaryPotassium +
      "mg</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.textTotalCarb + "</td>\n";
    localNutritionLabel += localTab5 + "<td>&nbsp;</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol1DietaryTotalCarb +
      "g</td>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>" +
      $localSettings.valueCol2DietaryTotalCarb +
      "g</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab4 + "<tr>\n";
    localNutritionLabel +=
      localTab5 +
      "<td>&nbsp;&nbsp; " +
      $localSettings.textCalorieDietHtmlLegacyDietary +
      "</td>\n";
    localNutritionLabel += localTab5 + "<td>&nbsp;</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol1Dietary + "g</td>\n";
    localNutritionLabel +=
      localTab5 + "<td>" + $localSettings.valueCol2Dietary + "g</td>\n";
    localNutritionLabel += localTab4 + "</tr>\n";
    localNutritionLabel += localTab3 + "</tbody>\n";
    return (localNutritionLabel += localTab2 + "</table>\n");
  }
  function ingredientsHtmlLegacy($localSettings, localTab1, localTab2) {
    var localNutritionLabel = "";
    if (!$localSettings.hidePercentDailyValues) {
      localNutritionLabel += localTab1 + "<br/>\n";
    }
    localNutritionLabel +=
      localTab1 +
      '<div class="' +
      ($localSettings.hidePercentDailyValues
        ? "ingredientListDivHiddenDailyValues"
        : "ingredientListDiv") +
      '" tabindex="0">\n';
    localNutritionLabel +=
      localTab2 +
      '<strong class="active" id="ingredientList">' +
      $localSettings.ingredientLabel +
      "</strong>\n";
    localNutritionLabel += localTab2 + $localSettings.ingredientList + "\n";
    return (localNutritionLabel +=
      localTab1 + '</div><!-- closing class="ingredientListDiv" -->\n\n');
  }
  function disclaimerHtmlLegacy($localSettings, localTab1, localTab2) {
    var localNutritionLabel = localTab1 + "<br/>\n\n";
    localNutritionLabel += localTab1 + '<div id="calcDisclaimer">\n';
    localNutritionLabel +=
      localTab2 +
      '<span id="calcDisclaimerText" tabindex="0">' +
      $localSettings.valueDisclaimer +
      "</span>\n";
    localNutritionLabel +=
      localTab1 + '</div><!-- closing class="calcDisclaimer" -->\n\n';
    return (localNutritionLabel += localTab1 + "<br/>\n\n");
  }
  function bottomLinkHtmlLegacy($localSettings, localTab1) {
    var localNutritionLabel = localTab1 + '<div class="spaceAbove"></div>\n';
    localNutritionLabel +=
      localTab1 +
      '<a href="' +
      $localSettings.urlBottomLink +
      '" target="_newSite" class="homeLinkPrint">' +
      $localSettings.nameBottomLink +
      "</a>\n";
    return (localNutritionLabel +=
      localTab1 + '<div class="spaceBelow"></div>\n');
  }
  function generateAttributeWithoutPercentageHtmlLegacy(
    $localSettings,
    valueIndex,
    unitIndex,
    naIndex,
    attributeText,
    localTabValue,
    lineClass,
    attributeDisplayType,
    itemPropValue,
    localExtraTab,
    roundFunctionName
  ) {
    var localNaValue =
      '<font class="notApplicable" aria-hidden="true">' +
      $localSettings.textNotApplicable +
      '&nbsp;</font><font class="sr-only">' +
      $localSettings.textDataNotAvailable +
      "</font>\n";
    var localNutritionLabel =
      localTabValue + '<div class="' + lineClass + '" tabindex="0">\n';
    if (attributeDisplayType == 1) {
      localNutritionLabel +=
        "<strong>" +
        $localSettings[attributeText] +
        '</strong> <span itemprop="' +
        itemPropValue +
        '">';
    } else {
      if (attributeDisplayType == 2) {
        localNutritionLabel += $localSettings[attributeText] + " ";
      } else {
        if (attributeDisplayType == 3) {
          localNutritionLabel +=
            localExtraTab +
            $localSettings[attributeText] +
            ' <span itemprop="' +
            itemPropValue +
            '">';
        } else {
          if (attributeDisplayType == 4) {
            localNutritionLabel +=
              $localSettings[attributeText] +
              ' <span itemprop="' +
              itemPropValue +
              '">';
          } else {
            if (attributeDisplayType == 5) {
              localNutritionLabel += localExtraTab + '<div class="dv">\n';
            }
          }
        }
      }
    }
    localNutritionLabel += $localSettings[naIndex]
      ? localNaValue
      : ($localSettings.allowFDARounding
          ? eval(roundFunctionName)(
              $localSettings[valueIndex],
              $localSettings.decimalPlacesForNutrition
            )
          : parseFloat(
              $localSettings[valueIndex].toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            )) + $localSettings[unitIndex];
    if (attributeDisplayType == 1 || attributeDisplayType == 4) {
      localNutritionLabel += "</span></div>\n";
    } else {
      if (attributeDisplayType == 2) {
        localNutritionLabel += "</div>\n";
      } else {
        if (attributeDisplayType == 3) {
          localNutritionLabel += "\n" + localTabValue + "</span></div>\n";
        } else {
          if (attributeDisplayType == 5) {
            localNutritionLabel += "</div>\n";
            localNutritionLabel +=
              localExtraTab + $localSettings[attributeText] + "\n";
            localNutritionLabel += localTabValue + "</div>\n";
          }
        }
      }
    }
    return localNutritionLabel;
  }
  function generateAttributeWithPercentageHtmlLegacy(
    $localSettings,
    valueIndex,
    dailyValueIndex,
    unitIndex,
    naIndex,
    attributeTexts,
    lineClass,
    itemPropValue,
    roundFunctionName,
    roundFunctionRuleName,
    boldName,
    showPercentageCode
  ) {
    for (x = 1; x < 3; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localNaValue =
      '<font class="notApplicable" aria-hidden="true">' +
      $localSettings.textNotApplicable +
      '&nbsp;</font><font class="sr-only">' +
      $localSettings.textDataNotAvailable +
      "</font>\n";
    var localNutritionLabel =
      localTab1 + '<div class="' + lineClass + '" tabindex="0">\n';
    if (!$localSettings.hidePercentDailyValues && showPercentageCode) {
      localNutritionLabel += localTab2 + '<div class="dv" aria-hidden="true">';
      localNutritionLabel += $localSettings[naIndex]
        ? localNaValue
        : "<strong>" +
          parseFloat(
            parseFloat(
              (($localSettings.allowFDARounding
                ? eval(roundFunctionRuleName)($localSettings[valueIndex])
                : $localSettings[valueIndex]) /
                ($localSettings[dailyValueIndex] == 0
                  ? 1
                  : $localSettings[dailyValueIndex] *
                    (parseFloat($localSettings.calorieIntake) / 2000).toFixed(
                      2
                    ))) *
                100
            ).toFixed($localSettings.decimalPlacesForDailyValues)
          ) +
          "</strong>%";
      localNutritionLabel += "</div>\n";
    }
    if (boldName) {
      localNutritionLabel +=
        localTab2 +
        "<strong>" +
        $localSettings[attributeTexts] +
        '</strong> <span itemprop="' +
        itemPropValue +
        '">';
    } else {
      localNutritionLabel +=
        localTab2 +
        $localSettings[attributeTexts] +
        ' <span itemprop="' +
        itemPropValue +
        '">';
    }
    localNutritionLabel +=
      ($localSettings[naIndex]
        ? localNaValue
        : ($localSettings.allowFDARounding
            ? eval(roundFunctionName)(
                $localSettings[valueIndex],
                $localSettings.decimalPlacesForNutrition
              )
            : parseFloat(
                $localSettings[valueIndex].toFixed(
                  $localSettings.decimalPlacesForNutrition
                )
              )) + $localSettings[unitIndex]) + "\n";
    return (localNutritionLabel += localTab1 + "</span></div>\n");
  }
  function generateAttributeHtml2018Version(
    $localSettings,
    valueIndex,
    unitIndex,
    naIndex,
    attributeText,
    itemPropValue,
    topDivClass,
    showPercentageCode,
    roundFunctionName,
    roundFunctionRuleName,
    labelClass,
    valueClass,
    dailyValueIndex
  ) {
    for (x = 1; x < 4; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localNaValue =
      '<font class="notApplicable" aria-hidden="true">' +
      $localSettings.textNotApplicable +
      '&nbsp;</font><font class="sr-only">' +
      $localSettings.textDataNotAvailable +
      "</font>\n";
    var localNutritionLabel =
      localTab1 + '<div class="' + topDivClass + '" tabindex="0">\n';
    if (showPercentageCode && !$localSettings.hidePercentDailyValues) {
      localNutritionLabel +=
        localTab2 + '<span class="nf-highlight nf-pr" aria-hidden="true">';
      localNutritionLabel += $localSettings[naIndex]
        ? localNaValue
        : parseFloat(
            parseFloat(
              (($localSettings.allowFDARounding
                ? eval(roundFunctionRuleName)($localSettings[valueIndex])
                : $localSettings[valueIndex]) /
                ($localSettings[dailyValueIndex] == 0
                  ? 1
                  : $localSettings[dailyValueIndex] *
                    (parseFloat($localSettings.calorieIntake) / 2000).toFixed(
                      2
                    ))) *
                100
            ).toFixed($localSettings.decimalPlacesForDailyValues)
          ) + "%";
      localNutritionLabel += "</span>\n";
    }
    if (valueIndex != "valueAddedSugars") {
      localNutritionLabel += localTab2 + '<span class="' + labelClass + '">';
      localNutritionLabel += $localSettings[attributeText];
      localNutritionLabel += "</span>\n";
      localNutritionLabel +=
        localTab2 +
        '<span class="' +
        valueClass +
        '" itemprop="' +
        itemPropValue +
        '">';
      localNutritionLabel += $localSettings[naIndex]
        ? localNaValue
        : ($localSettings.allowFDARounding
            ? eval(roundFunctionName)(
                $localSettings[valueIndex],
                $localSettings.decimalPlacesForNutrition
              )
            : parseFloat(
                $localSettings[valueIndex].toFixed(
                  $localSettings.decimalPlacesForNutrition
                )
              )) + $localSettings[unitIndex];
      localNutritionLabel += "</span>\n";
    } else {
      localNutritionLabel += localTab2 + '<span class="' + labelClass + '">\n';
      localNutritionLabel += $localSettings.textAddedSugars1 + "\n";
      localNutritionLabel +=
        localTab3 +
        '<span class="' +
        valueClass +
        '" itemprop="' +
        itemPropValue +
        '">';
      localNutritionLabel += $localSettings[naIndex]
        ? localNaValue
        : ($localSettings.allowFDARounding
            ? eval(roundFunctionName)(
                $localSettings[valueIndex],
                $localSettings.decimalPlacesForNutrition
              )
            : parseFloat(
                $localSettings[valueIndex].toFixed(
                  $localSettings.decimalPlacesForNutrition
                )
              )) + $localSettings[unitIndex];
      localNutritionLabel += "</span>\n";
      localNutritionLabel += $localSettings.textAddedSugars2;
      localNutritionLabel += "</span>\n";
    }
    return (localNutritionLabel += localTab1 + "</div>\n");
  }
  function ingredientsHtml2018Version($localSettings, localTab1, localTab2) {
    var localNutritionLabel = "";
    if (!$localSettings.hidePercentDailyValues) {
      localNutritionLabel += localTab1 + "<br/>\n\n";
    }
    localNutritionLabel +=
      localTab1 +
      '<div class="' +
      ($localSettings.hidePercentDailyValues
        ? "nf-ingredientListDivHiddenDailyValues"
        : "nf-ingredientListDiv") +
      '" tabindex="0">\n';
    localNutritionLabel +=
      localTab2 +
      '<strong class="active" id="nf-ingredientList">' +
      $localSettings.ingredientLabel +
      "</strong>\n";
    localNutritionLabel += localTab2 + $localSettings.ingredientList + "\n";
    return (localNutritionLabel +=
      localTab1 + '</div><!-- closing class="nf-ingredientListDiv" -->\n\n');
  }
  function disclaimerHtml2018Version($localSettings, localTab1, localTab2) {
    var localNutritionLabel = localTab1 + "<br/>\n\n";
    localNutritionLabel += localTab1 + '<div id="nf-calcDisclaimer">\n';
    localNutritionLabel +=
      localTab2 +
      '<span id="nf-calcDisclaimerText" tabindex="0">' +
      $localSettings.valueDisclaimer +
      "</span>\n";
    localNutritionLabel +=
      localTab1 + '</div><!-- closing class="nf-calcDisclaimer" -->\n\n';
    return (localNutritionLabel += localTab1 + "<br/>\n\n");
  }
  function bottomLinkHtml2018Version($localSettings, localTab1) {
    var localNutritionLabel = localTab1 + '<div class="nf-spaceAbove"></div>\n';
    localNutritionLabel +=
      localTab1 +
      '<a href="' +
      $localSettings.urlBottomLink +
      '" target="_newSite" class="nf-homeLinkPrint">' +
      $localSettings.nameBottomLink +
      "</a>\n";
    return (localNutritionLabel +=
      localTab1 + '<div class="nf-spaceBelow"></div>\n');
  }
  function generateHtmlAndComputeValueGivenThePercentage(
    $localSettings,
    valueIndex,
    dailyValueIndex,
    unitIndex_base,
    unitIndex_percent,
    naIndex,
    attributeTexts,
    showPercentageCode
  ) {
    var localNaValue =
      '<font class="notApplicable" aria-hidden="true">' +
      $localSettings.textNotApplicable +
      '&nbsp;</font><font class="sr-only">' +
      $localSettings.textDataNotAvailable +
      "</font>\n";
    var localNutritionLabel = '<div class="nf-vitamin-column" tabindex="0">\n';
    localNutritionLabel += $localSettings[attributeTexts] + " ";
    localNutritionLabel +=
      ($localSettings[naIndex]
        ? localNaValue
        : parseFloat(
            ($localSettings[valueIndex] / 100) * $localSettings[dailyValueIndex]
          ).toFixed($localSettings.decimalPlacesForDailyValues) +
          $localSettings[unitIndex_base] +
          (showPercentageCode
            ? ' <span class="nf-pr" aria-hidden="true">' +
              $localSettings[valueIndex].toFixed(
                $localSettings.decimalPlacesForDailyValues
              ) +
              $localSettings[unitIndex_percent] +
              "</span>"
            : "")) + "\n";
    return (localNutritionLabel += "</div>\n");
  }
  function itemNameHtml2018($localSettings, localTab1, localTab2, localTab3) {
    var itemNameClass = "";
    localNutritionLabel = "";
    if ($localSettings.showServingUnitQuantityTextbox) {
      if (
        $localSettings.valueServingSizeUnit == null ||
        $localSettings.valueServingSizeUnit == "" ||
        ($localSettings.valueServingSizeUnit !== "" &&
          $localSettings.valueServingSizeUnit !== null &&
          $localSettings.originalServingUnitQuantity <= 0)
      ) {
        var hideArrowsClass = "";
        var textboxClass = "nf-unitQuantityBox nf-modifier-field";
        if (!$localSettings.hideTextboxArrows) {
          localNutritionLabel += localTab1 + '<div class="nf-arrows">\n';
          localNutritionLabel +=
            localTab2 +
            '<div class="nf-unitQuantityUp nf-arrow-up" aria-label="' +
            $localSettings.textAriaLabelIncreaseQuantityArrow +
            '" ';
          localNutritionLabel += 'rel="nofollow" tabindex="0"></div>\n';
          localNutritionLabel +=
            localTab2 +
            '<div class="nf-unitQuantityDown nf-arrow-down" aria-label="' +
            $localSettings.textAriaLabelDecreaseQuantityArrow +
            '" ';
          localNutritionLabel += 'rel="nofollow" tabindex="0"></div>\n';
          localNutritionLabel +=
            localTab1 + '</div><!-- closing class="nf-arrows v1" -->\n\n';
        } else {
          textboxClass =
            "nf-unitQuantityBox nf-modifier-field nf-arrowsAreHidden";
          hideArrowsClass = "nf-fixed-serving ";
        }
        localNutritionLabel +=
          localTab1 +
          '<input type="text" value="' +
          parseFloat(
            $localSettings.valueServingUnitQuantity.toFixed(
              $localSettings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" class="' +
          textboxClass +
          '" data-role="none" aria-label="' +
          $localSettings.textAriaLabelChangeQuantityTextbox +
          '">\n';
        localNutritionLabel +=
          localTab1 +
          '<input type="hidden" value="' +
          parseFloat(
            $localSettings.valueServingUnitQuantity.toFixed(
              $localSettings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" id="nf-nixLabelBeforeQuantity">\n\n';
        var itemNameClass = hideArrowsClass;
      } else {
        if (!$localSettings.showServingUnitQuantity) {
          itemNameClass += "no-indent";
        }
      }
    } else {
      itemNameClass += "no-indent";
    }
    localNutritionLabel +=
      localTab1 +
      '<div class="nf-item-name ' +
      itemNameClass +
      '" tabindex="0">\n';
    if (
      $localSettings.showServingUnitQuantity &&
      $localSettings.originalServingUnitQuantity > 0 &&
      $localSettings.valueServingSizeUnit !== "" &&
      $localSettings.valueServingSizeUnit !== null
    ) {
      localNutritionLabel +=
        localTab2 + $localSettings.valueServingSizeUnit + "\n";
      if ($localSettings.valueServingWeightGrams > 0) {
        localNutritionLabel +=
          localTab2 +
          '(<span itemprop="servingSize">' +
          parseFloat(
            $localSettings.valueServingWeightGrams.toFixed(
              $localSettings.decimalPlacesForNutrition
            )
          ) +
          $localSettings.unitServingWeight +
          "</span>)\n";
      }
    }
    localNutritionLabel += localTab2 + "<div>\n";
    localNutritionLabel += localTab3 + $localSettings.itemName + "\n";
    if (
      $localSettings.showBrandName &&
      $localSettings.brandName != null &&
      $localSettings.brandName != ""
    ) {
      localNutritionLabel += " - " + $localSettings.brandName;
    }
    localNutritionLabel += "\n" + localTab2 + "</div>\n";
    return (localNutritionLabel += localTab1 + "</div>\n");
  }
  function sevingUnitQuantityHtml2018($localSettings) {
    for (x = 3; x < 7; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localServingSizeIsHidden = (localServingContainerIsHidden = false);
    var localNutritionLabel = "";
    if ($localSettings.showServingUnitQuantity) {
      if ($localSettings.originalServingUnitQuantity > 0) {
        localNutritionLabel +=
          localTab3 +
          '<div tabIndex="0"><!-- opening for serving size div -->\n';
        localNutritionLabel += localTab4 + $localSettings.textServingSize;
        localNutritionLabel += $localSettings.showServingUnitQuantityTextbox
          ? ""
          : ' <span itemprop="servingSize">' +
            parseFloat(
              $localSettings.originalServingUnitQuantity.toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            ) +
            "</span>\n";
        var servingSizeDivAlreadyClosed = false;
        var unitAddedClass = "";
        var gramsAddedClass = "";
        if (
          $localSettings.valueServingSizeUnit !== "" &&
          $localSettings.valueServingSizeUnit !== null
        ) {
          if (
            $localSettings.showServingUnitQuantityTextbox &&
            $localSettings.valueServingSizeUnit != null &&
            $localSettings.valueServingSizeUnit != ""
          ) {
            unitAddedClass = "nf-unitHasTextbox";
            gramsAddedClass = "nf-gramsHasTextbox";
            servingSizeDivAlreadyClosed = true;
            localNutritionLabel +=
              "\n" +
              localTab3 +
              "</div><!-- closing for serving size div -->\n\n";
            var textboxClass = "nf-unitQuantityBox nf-modifier-field";
            if (!$localSettings.hideTextboxArrows) {
              localNutritionLabel +=
                localTab5 +
                '<div class="nf-arrows"><!-- opening class="nf-arrows" -->\n';
              localNutritionLabel +=
                localTab6 +
                '<div class="nf-unitQuantityUp nf-arrow-up" aria-label="' +
                $localSettings.textAriaLabelIncreaseQuantityArrow +
                '" ';
              localNutritionLabel += 'rel="nofollow" tabindex="0"></div>\n';
              localNutritionLabel +=
                localTab6 +
                '<div class="nf-unitQuantityDown nf-arrow-down" aria-label="' +
                $localSettings.textAriaLabelDecreaseQuantityArrow +
                '" ';
              localNutritionLabel += 'rel="nofollow" tabindex="0"></div>\n';
              localNutritionLabel +=
                localTab5 + '</div><!-- closing class="nf-arrows v2" -->\n\n';
            } else {
              textboxClass =
                "nf-unitQuantityBox nf-modifier-field nf-arrowsAreHidden";
            }
            localNutritionLabel +=
              localTab5 +
              '<input type="text" data-role="none" value="' +
              parseFloat(
                $localSettings.valueServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForQuantityTextbox
                )
              ) +
              '" class="' +
              textboxClass +
              '" aria-label="' +
              $localSettings.textAriaLabelChangeQuantityTextbox +
              '">\n';
            localNutritionLabel +=
              localTab5 +
              '<input type="hidden" value="' +
              parseFloat(
                $localSettings.valueServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForQuantityTextbox
                )
              ) +
              '" id="nf-nixLabelBeforeQuantity">\n\n';
          } else {
            if (
              $localSettings.originalServingUnitQuantity > 0 &&
              $localSettings.showServingUnitQuantityTextbox
            ) {
              localNutritionLabel +=
                ' <span itemprop="servingSize">' +
                parseFloat(
                  $localSettings.originalServingUnitQuantity.toFixed(
                    $localSettings.decimalPlacesForNutrition
                  )
                ) +
                "</span>\n";
            }
          }
          if (!$localSettings.showItemName) {
            localNutritionLabel +=
              localTab5 + '<div class="nf-item-name" tabindex="0">\n';
            localNutritionLabel +=
              localTab6 + $localSettings.valueServingSizeUnit + "\n";
            if ($localSettings.valueServingWeightGrams > 0) {
              localNutritionLabel +=
                localTab6 +
                "(" +
                parseFloat(
                  $localSettings.valueServingWeightGrams.toFixed(
                    $localSettings.decimalPlacesForNutrition
                  )
                ) +
                $localSettings.unitServingWeight +
                ")\n";
            }
            localNutritionLabel += localTab5 + "</div>\n";
          }
        } else {
          if (
            $localSettings.originalServingUnitQuantity > 0 &&
            $localSettings.showServingUnitQuantityTextbox
          ) {
            localNutritionLabel +=
              ' <span itemprop="servingSize">' +
              parseFloat(
                $localSettings.originalServingUnitQuantity.toFixed(
                  $localSettings.decimalPlacesForNutrition
                )
              ) +
              "</span>\n";
            if (
              ($localSettings.valueServingSizeUnit == "" ||
                $localSettings.valueServingSizeUnit == null) &&
              $localSettings.valueServingWeightGrams > 0
            ) {
              localNutritionLabel +=
                localTab4 +
                "(" +
                parseFloat(
                  $localSettings.valueServingWeightGrams.toFixed(
                    $localSettings.decimalPlacesForNutrition
                  )
                ) +
                $localSettings.unitServingWeight +
                ")\n";
            }
          }
        }
        if (!servingSizeDivAlreadyClosed) {
          localNutritionLabel +=
            localTab3 + "</div><!-- closing for serving size div -->\n\n";
        }
      } else {
        localServingSizeIsHidden = true;
      }
    }
    return {
      servingSizeIsHidden: localServingSizeIsHidden,
      servingContainerIsHidden: localServingContainerIsHidden,
      nutritionLabel: localNutritionLabel
    };
  }
  function generateAttributeForUK(
    $localSettings,
    valueIndex,
    dailyValueIndex,
    unitIndex,
    naIndex,
    attributeTexts,
    itemPropValue,
    roundFunctionName,
    roundFunctionRuleName,
    showPercentageCode,
    indentedName
  ) {
    for (x = 1; x < 6; x++) {
      var tab = "";
      for (y = 1; y <= x; y++) {
        tab += "\t";
      }
      eval("var localTab" + x + ' = "' + tab + '";');
    }
    var localNaValue =
      '<font class="notApplicable" aria-hidden="true">' +
      $localSettings.textNotApplicable +
      '&nbsp;</font><font class="sr-only">' +
      $localSettings.textDataNotAvailable +
      "</font>\n";
    var localNutritionLabel = localTab2 + '<tr tabindex="0">\n';
    var nameClass = "";
    if (indentedName) {
      nameClass = "uk_nf-indent";
    }
    localNutritionLabel += localTab3 + '<td class="' + nameClass + '">';
    if (attributeTexts + "" != "") {
      localNutritionLabel += $localSettings[attributeTexts];
    }
    localNutritionLabel += "</td>\n";
    var nutritionValueLocal = $localSettings[valueIndex];
    if (valueIndex == "valueCalories" && unitIndex == "unitEnergy_kj") {
      nutritionValueLocal *= 4.184;
    } else {
      if (valueIndex == "valueSodium") {
        nutritionValueLocal *= 0.0025;
      }
    }
    localNutritionLabel += localTab3 + "<td>";
    localNutritionLabel += $localSettings[naIndex]
      ? localNaValue
      : ($localSettings.allowFDARounding
          ? valueIndex == "valueCalories"
            ? eval(roundFunctionName)(
                (nutritionValueLocal / $localSettings.valueServingWeightGrams) *
                  100,
                1
              )
            : eval(roundFunctionName)(
                (nutritionValueLocal / $localSettings.valueServingWeightGrams) *
                  100
              )
          : parseFloat(
              (
                (nutritionValueLocal / $localSettings.valueServingWeightGrams) *
                100
              ).toFixed($localSettings.decimalPlacesForNutrition)
            )) + $localSettings[unitIndex];
    localNutritionLabel += "</td>\n";
    localNutritionLabel += localTab3 + '<td itemprop="' + itemPropValue + '">';
    localNutritionLabel += $localSettings[naIndex]
      ? localNaValue
      : ($localSettings.allowFDARounding
          ? valueIndex == "valueCalories"
            ? eval(roundFunctionName)(nutritionValueLocal, 1)
            : eval(roundFunctionName)(nutritionValueLocal)
          : parseFloat(
              nutritionValueLocal.toFixed(
                $localSettings.decimalPlacesForNutrition
              )
            )) + $localSettings[unitIndex];
    localNutritionLabel += "</td>\n";
    localNutritionLabel += localTab3 + '<td aria-hidden="true">';
    if (!$localSettings.hidePercentDailyValues && showPercentageCode) {
      localNutritionLabel += $localSettings[naIndex]
        ? localNaValue
        : parseFloat(
            parseFloat(
              (($localSettings.allowFDARounding
                ? valueIndex == "valueCalories"
                  ? eval(roundFunctionRuleName)(nutritionValueLocal, 1)
                  : eval(roundFunctionRuleName)(nutritionValueLocal)
                : nutritionValueLocal) /
                ($localSettings[dailyValueIndex] == 0
                  ? 1
                  : $localSettings[dailyValueIndex] *
                    (parseFloat($localSettings.calorieIntake) / 2000).toFixed(
                      2
                    ))) *
                100
            ).toFixed($localSettings.decimalPlacesForDailyValues)
          ) + "%";
    }
    return localNutritionLabel + "</td>\n" + localTab2 + "</tr>\n";
  }
  function referenceIntakeHtmlUKVersion($localSettings, localTab1, localTab2) {
    var localNutritionLabel =
      localTab1 + '<div class="referenceIntake" tabindex="0">\n';
    localNutritionLabel +=
      localTab2 + "* " + $localSettings.textUKReferenceIntake + " ";
    localNutritionLabel +=
      "(" +
      roundToNearestNum($localSettings.calorieIntake * 4.184, 100) +
      $localSettings.unitEnergy_kj;
    localNutritionLabel +=
      "/" +
      $localSettings.calorieIntake +
      $localSettings.unitEnergy_kcal +
      ")\n";
    return (localNutritionLabel +=
      localTab1 + '</div>\n<div class="uk_nf-spaceBelow"></div>\n');
  }
  function ingredientsHtmlUKVersion($localSettings, localTab1, localTab2) {
    var localNutritionLabel =
      localTab1 + '<div class="uk_nf-ingredientListDiv" tabindex="0">\n';
    localNutritionLabel +=
      localTab2 +
      '<strong class="active" id="uk_nf-ingredient-statement">' +
      $localSettings.ingredientLabel +
      "</strong> " +
      $localSettings.ingredientList +
      "\n";
    return (localNutritionLabel +=
      localTab1 +
      '</div><br/><!-- closing class="uk_nf-ingredientListDiv" -->\n\n');
  }
  function disclaimerHtmlUKVersion($localSettings, localTab1, localTab2) {
    var localNutritionLabel = localTab1 + '<div id="uk_nf-calcDisclaimer">\n';
    localNutritionLabel +=
      localTab2 +
      '<span id="uk_nf-disclaimer" tabindex="0">' +
      $localSettings.valueDisclaimer +
      "</span>\n";
    return (localNutritionLabel +=
      localTab1 + '</div><br/><!-- closing id="uk_nf-calcDisclaimer" -->\n\n');
  }
  function bottomLinkHtmlUKVersion($localSettings, localTab1) {
    var localNutritionLabel =
      localTab1 + '<div class="uk_nf-spaceAbove"></div>\n';
    localNutritionLabel +=
      localTab1 +
      '<a href="' +
      $localSettings.urlBottomLink +
      '" target="_newSite" class="uk_nf-homeLinkPrint">' +
      $localSettings.nameBottomLink +
      "</a>\n";
    return (localNutritionLabel +=
      localTab1 + '<div class="uk_nf-spaceBelow"></div>\n');
  }
  NutritionLabel.prototype = {
    generateLegacy: function() {
      var $this = this;
      if ($this.nutritionLabel) {
        return $this.nutritionLabel;
      }
      if ($this.settings.hideNotApplicableValues) {
        $this.settings.showCalories = $this.settings.naCalories
          ? false
          : $this.settings.showCalories;
        $this.settings.showFatCalories = $this.settings.naFatCalories
          ? false
          : $this.settings.showFatCalories;
        $this.settings.showTotalFat = $this.settings.naTotalFat
          ? false
          : $this.settings.showTotalFat;
        $this.settings.showSatFat = $this.settings.naSatFat
          ? false
          : $this.settings.showSatFat;
        $this.settings.showTransFat = $this.settings.naTransFat
          ? false
          : $this.settings.showTransFat;
        $this.settings.showPolyFat = $this.settings.naPolyFat
          ? false
          : $this.settings.showPolyFat;
        $this.settings.showMonoFat = $this.settings.naMonoFat
          ? false
          : $this.settings.showMonoFat;
        $this.settings.showCholesterol = $this.settings.naCholesterol
          ? false
          : $this.settings.showCholesterol;
        $this.settings.showSodium = $this.settings.naSodium
          ? false
          : $this.settings.showSodium;
        $this.settings.showPotassium = $this.settings.naPotassium
          ? false
          : $this.settings.showPotassium;
        $this.settings.showTotalCarb = $this.settings.naTotalCarb
          ? false
          : $this.settings.showTotalCarb;
        $this.settings.showFibers = $this.settings.naFibers
          ? false
          : $this.settings.showFibers;
        $this.settings.showSugars = $this.settings.naSugars
          ? false
          : $this.settings.showSugars;
        $this.settings.showSugarAlcohol = $this.settings.naSugarAlcohol
          ? false
          : $this.settings.showSugarAlcohol;
        $this.settings.showProteins = $this.settings.naProteins
          ? false
          : $this.settings.showProteins;
        $this.settings.showVitaminA = $this.settings.naVitaminA
          ? false
          : $this.settings.showVitaminA;
        $this.settings.showVitaminC = $this.settings.naVitaminC
          ? false
          : $this.settings.showVitaminC;
        $this.settings.showCalcium = $this.settings.naCalcium
          ? false
          : $this.settings.showCalcium;
        $this.settings.showIron = $this.settings.naIron
          ? false
          : $this.settings.showIron;
      }
      if ($this.settings.hidePercentDailyValues) {
        $this.settings.showVitaminA = false;
        $this.settings.showVitaminC = false;
        $this.settings.showCalcium = false;
        $this.settings.showIron = false;
      }
      for (x = 1; x < 9; x++) {
        var tab = "";
        for (y = 1; y <= x; y++) {
          tab += "\t";
        }
        eval("var tab" + x + ' = "' + tab + '";');
      }
      var borderCSS = "";
      if ($this.settings.allowNoBorder) {
        borderCSS = "border: 0;";
      }
      var nutritionLabel =
        '<div itemscope itemtype="http://schema.org/NutritionInformation" class="nutritionLabel" style="' +
        borderCSS;
      if (!$this.settings.allowCustomWidth) {
        nutritionLabel += " width: " + $this.settings.width + 'px;">\n';
      } else {
        nutritionLabel += " width: " + $this.settings.widthCustom + ';">\n';
      }
      nutritionLabel +=
        tab1 +
        '<div class="title" tabindex="0">' +
        $this.settings.textNutritionFacts +
        "</div>\n";
      if ($this.settings.showItemName) {
        nutritionLabel += itemNameHtmlLegacy($this.settings);
      }
      var sevingUnitQuantityHtmlLegacyResult = sevingUnitQuantityHtmlLegacy(
        $this.settings
      );
      var servingSizeIsHidden =
        sevingUnitQuantityHtmlLegacyResult.servingSizeIsHidden;
      var servingContainerIsHidden =
        sevingUnitQuantityHtmlLegacyResult.servingContainerIsHidden;
      nutritionLabel += sevingUnitQuantityHtmlLegacyResult.nutritionLabel;
      if (
        (!$this.settings.showItemName &&
          !$this.settings.showServingUnitQuantity) ||
        (!$this.settings.showItemName &&
          servingSizeIsHidden &&
          servingContainerIsHidden)
      ) {
        nutritionLabel += tab1 + '<div class="headerSpacer"></div>\n';
      }
      nutritionLabel += tab1 + '<div class="bar1"></div>\n';
      if ($this.settings.showAmountPerServing) {
        nutritionLabel += tab1 + '<div class="line m" tabindex="0">';
        nutritionLabel +=
          "<strong>" + $this.settings.textAmountPerServing + "</strong>";
        nutritionLabel += "</div>\n";
      }
      nutritionLabel += tab1 + '<div class="line">\n';
      if ($this.settings.showFatCalories) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueFatCalories",
          "unitFatCalories",
          "naFatCalories",
          "textFatCalories",
          tab2,
          "fr",
          2,
          "",
          "",
          "roundCalories"
        );
      }
      if ($this.settings.showCalories) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueCalories",
          "unitCalories",
          "naCalories",
          "textCalories",
          tab2,
          "",
          1,
          "calories",
          "",
          "roundCalories"
        );
      } else {
        if ($this.settings.showFatCalories) {
          nutritionLabel += tab2 + "<div>&nbsp;</div>\n";
        }
      }
      nutritionLabel += tab1 + "</div>\n";
      nutritionLabel += tab1 + '<div class="bar2"></div>\n';
      if (!$this.settings.hidePercentDailyValues) {
        nutritionLabel += tab1 + '<div class="line ar ">';
        nutritionLabel +=
          "<strong>% " +
          $this.settings.textDailyValues +
          "<sup>*</sup></strong>";
        nutritionLabel += "</div>\n";
      }
      if ($this.settings.showTotalFat) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueTotalFat",
          "dailyValueTotalFat",
          "unitTotalFat",
          "naTotalFat",
          "textTotalFat",
          "line",
          "fatContent",
          "roundFat",
          "roundFatRule",
          true,
          $this.settings.showDailyTotalFat
        );
      }
      if ($this.settings.showSatFat) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueSatFat",
          "dailyValueSatFat",
          "unitSatFat",
          "naSatFat",
          "textSatFat",
          "line indent",
          "saturatedFatContent",
          "roundFat",
          "roundFatRule",
          false,
          $this.settings.showDailySatFat
        );
      }
      if ($this.settings.showTransFat) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueTransFat",
          "unitTransFat",
          "naTransFat",
          "textTransFat",
          tab1,
          "line indent",
          3,
          "transFatContent",
          tab2,
          "roundFat"
        );
      }
      if ($this.settings.showPolyFat) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valuePolyFat",
          "unitPolyFat",
          "naPolyFat",
          "textPolyFat",
          tab1,
          "line indent",
          2,
          "",
          "",
          "roundFat"
        );
      }
      if ($this.settings.showMonoFat) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueMonoFat",
          "unitMonoFat",
          "naMonoFat",
          "textMonoFat",
          tab1,
          "line indent",
          2,
          "",
          "",
          "roundFat"
        );
      }
      if ($this.settings.showCholesterol) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueCholesterol",
          "dailyValueCholesterol",
          "unitCholesterol",
          "naCholesterol",
          "textCholesterol",
          "line",
          "cholesterolContent",
          "roundCholesterol",
          "roundCholesterolRule",
          true,
          $this.settings.showDailyCholesterol
        );
      }
      if ($this.settings.showSodium) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueSodium",
          "dailyValueSodium",
          "unitSodium",
          "naSodium",
          "textSodium",
          "line",
          "sodiumContent",
          "roundSodium",
          "roundSodiumRule",
          true,
          $this.settings.showDailySodium
        );
      }
      if ($this.settings.showPotassium) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valuePotassium",
          "dailyValuePotassium",
          "unitPotassium",
          "naPotassium",
          "textPotassium",
          "line",
          "potassiumContent",
          "roundPotassium",
          "roundPotassiumRule",
          true,
          $this.settings.showDailyPotassium
        );
      }
      if ($this.settings.showTotalCarb) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueTotalCarb",
          "dailyValueCarb",
          "unitTotalCarb",
          "naTotalCarb",
          "textTotalCarb",
          "line",
          "carbohydrateContent",
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          true,
          $this.settings.showDailyTotalCarb
        );
      }
      if ($this.settings.showFibers) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueFibers",
          "dailyValueFiber",
          "unitFibers",
          "naFibers",
          "textFibers",
          "line indent",
          "fiberContent",
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          false,
          $this.settings.showDailyFibers
        );
      }
      if ($this.settings.showSugars) {
        nutritionLabel += generateAttributeWithPercentageHtmlLegacy(
          $this.settings,
          "valueSugars",
          "dailyValueSugar",
          "unitSugars",
          "naSugars",
          "textSugars",
          "line indent",
          "sugarContent",
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          false,
          $this.settings.showDailySugars
        );
      }
      if ($this.settings.showSugarAlcohol) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueSugarAlcohol",
          "unitSugarAlcohol",
          "naSugarAlcohol",
          "textSugarAlcohol",
          tab1,
          "line indent",
          4,
          "",
          "",
          "roundCarbFiberSugarProtein"
        );
      }
      if ($this.settings.showProteins) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueProteins",
          "unitProteins",
          "naProteins",
          "textProteins",
          tab1,
          "line",
          1,
          "proteinContent",
          "",
          "roundCarbFiberSugarProtein"
        );
      }
      nutritionLabel += tab1 + '<div class="bar1"></div>\n';
      if ($this.settings.showVitaminA) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueVitaminA",
          "unitVitaminA",
          "naVitaminA",
          "textVitaminA",
          tab1,
          "line vitaminA",
          5,
          "",
          tab2,
          "roundVitaminsCalciumIron"
        );
      }
      if ($this.settings.showVitaminC) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueVitaminC",
          "unitVitaminC",
          "naVitaminC",
          "textVitaminC",
          tab1,
          "line vitaminC",
          5,
          "",
          tab2,
          "roundVitaminsCalciumIron"
        );
      }
      if ($this.settings.showCalcium) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueCalcium",
          "unitCalcium",
          "naCalcium",
          "textCalcium",
          tab1,
          "line calcium",
          5,
          "",
          tab2,
          "roundVitaminsCalciumIron"
        );
      }
      if ($this.settings.showIron) {
        nutritionLabel += generateAttributeWithoutPercentageHtmlLegacy(
          $this.settings,
          "valueIron",
          "unitIron",
          "naIron",
          "textIron",
          tab1,
          "line iron",
          5,
          "",
          tab2,
          "roundVitaminsCalciumIron"
        );
      }
      nutritionLabel += tab1 + '<div class="dvCalorieDiet line">\n';
      nutritionLabel += tab2 + '<div class="calorieNote">\n';
      if (!$this.settings.hidePercentDailyValues) {
        nutritionLabel +=
          tab3 +
          '<span tabindex="0"><span class="star" aria-hidden="true">*</span> ' +
          $this.settings.textPercentDailyPart1 +
          " " +
          $this.settings.calorieIntake +
          " " +
          $this.settings.textPercentDailyPart2 +
          ".</span>\n";
      }
      if ($this.settings.showIngredients) {
        nutritionLabel += ingredientsHtmlLegacy($this.settings, tab3, tab4);
      }
      if ($this.settings.showDisclaimer) {
        nutritionLabel += disclaimerHtmlLegacy($this.settings, tab3, tab4);
      }
      nutritionLabel += tab2 + '</div><!-- closing class="calorieNote" -->\n\n';
      if ($this.settings.showCalorieDiet) {
        nutritionLabel += calorieDietHtmlLegacy($this.settings);
      }
      nutritionLabel +=
        tab1 + '</div><!-- closing class="dvCalorieDiet line" -->\n\n';
      if ($this.settings.showBottomLink) {
        nutritionLabel += bottomLinkHtmlLegacy($this.settings, tab1);
      }
      if ($this.settings.showCustomFooter) {
        nutritionLabel +=
          tab1 +
          '<div class="customFooter" tabindex="0">' +
          $this.settings.valueCustomFooter +
          "</div>\n";
      }
      return (nutritionLabel +=
        '<div class="naTooltip">' +
        $this.settings.textDataNotAvailable +
        '</div>\n</div><!-- closing class="nutritionLabel" -->\n');
    },
    generate2018: function() {
      var $this = this;
      if ($this.nutritionLabel) {
        return $this.nutritionLabel;
      }
      if ($this.settings.hideNotApplicableValues) {
        $this.settings.showCalories = $this.settings.naCalories
          ? false
          : $this.settings.showCalories;
        $this.settings.showFatCalories = $this.settings.naFatCalories
          ? false
          : $this.settings.showFatCalories;
        $this.settings.showTotalFat = $this.settings.naTotalFat
          ? false
          : $this.settings.showTotalFat;
        $this.settings.showSatFat = $this.settings.naSatFat
          ? false
          : $this.settings.showSatFat;
        $this.settings.showTransFat = $this.settings.naTransFat
          ? false
          : $this.settings.showTransFat;
        $this.settings.showPolyFat = $this.settings.naPolyFat
          ? false
          : $this.settings.showPolyFat;
        $this.settings.showMonoFat = $this.settings.naMonoFat
          ? false
          : $this.settings.showMonoFat;
        $this.settings.showCholesterol = $this.settings.naCholesterol
          ? false
          : $this.settings.showCholesterol;
        $this.settings.showSodium = $this.settings.naSodium
          ? false
          : $this.settings.showSodium;
        $this.settings.showPotassium_2018 = $this.settings.naPotassium_2018
          ? false
          : $this.settings.showPotassium_2018;
        $this.settings.showTotalCarb = $this.settings.naTotalCarb
          ? false
          : $this.settings.showTotalCarb;
        $this.settings.showFibers = $this.settings.naFibers
          ? false
          : $this.settings.showFibers;
        $this.settings.showSugars = $this.settings.naSugars
          ? false
          : $this.settings.showSugars;
        $this.settings.showAddedSugars = $this.settings.naAddedSugars
          ? false
          : $this.settings.showAddedSugars;
        $this.settings.showSugarAlcohol = $this.settings.naSugarAlcohol
          ? false
          : $this.settings.showSugarAlcohol;
        $this.settings.showProteins = $this.settings.naProteins
          ? false
          : $this.settings.showProteins;
        $this.settings.showVitaminD = $this.settings.naVitaminD
          ? false
          : $this.settings.showVitaminD;
        $this.settings.showCalcium = $this.settings.naCalcium
          ? false
          : $this.settings.showCalcium;
        $this.settings.showIron = $this.settings.naIron
          ? false
          : $this.settings.showIron;
      }
      if ($this.settings.hidePercentDailyValues) {
        $this.settings.showDailyVitaminD = false;
        $this.settings.showDailyCalcium = false;
        $this.settings.showDailyIron = false;
        $this.settings.showDailyPotassium_2018 = false;
      }
      for (x = 1; x < 9; x++) {
        var tab = "";
        for (y = 1; y <= x; y++) {
          tab += "\t";
        }
        eval("var tab" + x + ' = "' + tab + '";');
      }
      var borderCSS = "";
      if ($this.settings.allowNoBorder) {
        borderCSS = "border: 0;";
      }
      var nutritionLabel =
        '<div itemscope itemtype="http://schema.org/NutritionInformation" class="nf" style="' +
        borderCSS;
      if (!$this.settings.allowCustomWidth) {
        nutritionLabel += " width: " + $this.settings.width + 'px;">\n';
      } else {
        nutritionLabel += " width: " + $this.settings.widthCustom + ';">\n';
      }
      nutritionLabel +=
        tab1 +
        '<div class="nf-title" tabindex="0">' +
        $this.settings.textNutritionFacts +
        "</div>\n";
      var sevingUnitQuantityHtml2018Result = sevingUnitQuantityHtml2018(
        $this.settings
      );
      var servingSizeIsHidden =
        sevingUnitQuantityHtml2018Result.servingSizeIsHidden;
      var servingContainerIsHidden =
        sevingUnitQuantityHtml2018Result.servingContainerIsHidden;
      var showLineDiv =
        $this.settings.showItemName ||
        (!$this.settings.showItemName &&
          servingSizeIsHidden &&
          servingContainerIsHidden) ||
        (!$this.settings.showItemName &&
          $this.settings.originalServingUnitQuantity > 0 &&
          $this.settings.valueServingWeightGrams > 0) ||
        ($this.settings.showServingUnitQuantity &&
          $this.settings.originalServingUnitQuantity > 0 &&
          $this.settings.showServingsPerContainer &&
          $this.settings.valueServingPerContainer > 0);
      if (showLineDiv) {
        nutritionLabel += tab1 + '<div class="nf-line">\n';
      }
      if (
        $this.settings.showServingUnitQuantity &&
        $this.settings.originalServingUnitQuantity > 0 &&
        $this.settings.showServingsPerContainer &&
        $this.settings.valueServingPerContainer > 0
      ) {
        nutritionLabel +=
          tab2 + '<div class="nf-per-container" tabindex="0">\n';
        nutritionLabel +=
          tab3 +
          parseFloat(
            $this.settings.valueServingPerContainer.toFixed(
              $this.settings.decimalPlacesForNutrition
            )
          );
        nutritionLabel += " " + $this.settings.textServingsPerContainer + "\n";
        nutritionLabel += tab2 + "</div>\n\n";
      }
      nutritionLabel += tab2 + '<div class="nf-serving">\n';
      nutritionLabel += sevingUnitQuantityHtml2018Result.nutritionLabel;
      if ($this.settings.showItemName) {
        nutritionLabel += itemNameHtml2018($this.settings, tab3, tab4, tab5);
      }
      nutritionLabel += tab2 + '</div><!-- end of class="nf-serving" -->\n\n';
      if (showLineDiv) {
        nutritionLabel += tab1 + '</div><!-- end of class="nf-line" -->\n\n';
      }
      nutritionLabel += tab1 + '<div class="nf-bar2"></div>\n';
      nutritionLabel +=
        tab1 +
        '<div class="nf-amount-per-serving" tabindex="0">' +
        $this.settings.textAmountPerServing +
        "</div>\n";
      if ($this.settings.showCalories) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueCalories",
          "unitCalories",
          "naCalories",
          "textCalories",
          "calories",
          "nf-calories",
          false,
          "roundCalories",
          "",
          "",
          "nf-pr",
          ""
        );
      }
      nutritionLabel += tab1 + '<div class="nf-bar1"></div>\n';
      if (!$this.settings.hidePercentDailyValues) {
        nutritionLabel += tab1 + '<div class="nf-line nf-text-right">\n';
        nutritionLabel +=
          tab2 +
          '<span class="nf-highlight nf-percent-dv">% ' +
          $this.settings.textDailyValues +
          "*</span>\n";
        nutritionLabel += tab1 + "</div>\n";
      }
      if ($this.settings.showTotalFat) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueTotalFat",
          "unitTotalFat",
          "naTotalFat",
          "textTotalFat",
          "fatContent",
          "nf-line",
          $this.settings.showDailyTotalFat,
          "roundFat",
          "roundFatRule",
          "nf-highlight",
          "",
          "dailyValueTotalFat"
        );
      }
      if ($this.settings.showSatFat) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueSatFat",
          "unitSatFat",
          "naSatFat",
          "textSatFat",
          "saturatedFatContent",
          "nf-line nf-indent",
          $this.settings.showDailySatFat,
          "roundFat",
          "roundFatRule",
          "",
          "",
          "dailyValueSatFat"
        );
      }
      if ($this.settings.showTransFat) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueTransFat",
          "unitTransFat",
          "naTransFat",
          "textTransFat",
          "transFatContent",
          "nf-line nf-indent",
          false,
          "roundFat",
          "",
          "",
          "",
          ""
        );
      }
      if ($this.settings.showPolyFat) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valuePolyFat",
          "unitPolyFat",
          "naPolyFat",
          "textPolyFat",
          "",
          "nf-line nf-indent",
          false,
          "roundFat",
          "",
          "",
          "",
          ""
        );
      }
      if ($this.settings.showMonoFat) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueMonoFat",
          "unitMonoFat",
          "naMonoFat",
          "textMonoFat",
          "",
          "nf-line nf-indent",
          false,
          "roundFat",
          "",
          "",
          "",
          ""
        );
      }
      if ($this.settings.showCholesterol) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueCholesterol",
          "unitCholesterol",
          "naCholesterol",
          "textCholesterol",
          "cholesterolContent",
          "nf-line",
          $this.settings.showDailyCholesterol,
          "roundCholesterol",
          "roundCholesterolRule",
          "nf-highlight",
          "",
          "dailyValueCholesterol"
        );
      }
      if ($this.settings.showSodium) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueSodium",
          "unitSodium",
          "naSodium",
          "textSodium",
          "sodiumContent",
          "nf-line",
          $this.settings.showDailySodium,
          "roundSodium",
          "roundSodiumRule",
          "nf-highlight",
          "",
          "dailyValueSodium"
        );
      }
      if ($this.settings.showTotalCarb) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueTotalCarb",
          "unitTotalCarb",
          "naTotalCarb",
          "textTotalCarb",
          "carbohydrateContent",
          "nf-line",
          $this.settings.showDailyTotalCarb,
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          "nf-highlight",
          "",
          "dailyValueCarb"
        );
      }
      if ($this.settings.showFibers) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueFibers",
          "unitFibers",
          "naFibers",
          "textFibers",
          "fiberContent",
          "nf-line nf-indent",
          $this.settings.showDailyFibers,
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          "",
          "",
          "dailyValueFiber"
        );
      }
      if ($this.settings.showSugars) {
        if (!$this.settings.indentSugarAndRemoveBoldStyleFor2018Label) {
          nutritionLabel += generateAttributeHtml2018Version(
            $this.settings,
            "valueSugars",
            "unitSugars",
            "naSugars",
            "textSugars",
            "sugarContent",
            "nf-line",
            $this.settings.showDailySugars,
            "roundCarbFiberSugarProtein",
            "roundCarbFiberSugarProteinRule",
            "nf-highlight",
            "",
            "dailyValueSugar"
          );
        } else {
          nutritionLabel += generateAttributeHtml2018Version(
            $this.settings,
            "valueSugars",
            "unitSugars",
            "naSugars",
            "textSugars",
            "sugarContent",
            "nf-line nf-indent",
            $this.settings.showDailySugars,
            "roundCarbFiberSugarProtein",
            "roundCarbFiberSugarProteinRule",
            "",
            "",
            "dailyValueSugar"
          );
        }
      }
      if ($this.settings.showAddedSugars) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueAddedSugars",
          "unitAddedSugars",
          "naAddedSugars",
          "textAddedSugars1",
          "",
          "nf-line nf-indent2",
          $this.settings.showDailyAddedSugars,
          "roundCarbFiberSugarProtein",
          "roundCarbFiberSugarProteinRule",
          "",
          "",
          "dailyValueAddedSugar"
        );
      }
      if ($this.settings.showSugarAlcohol) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueSugarAlcohol",
          "unitSugarAlcohol",
          "naSugarAlcohol",
          "textSugarAlcohol",
          "",
          "nf-line nf-indent",
          false,
          "roundCarbFiberSugarProtein",
          "",
          "",
          "",
          ""
        );
      }
      if ($this.settings.showProteins) {
        nutritionLabel += generateAttributeHtml2018Version(
          $this.settings,
          "valueProteins",
          "unitProteins",
          "naProteins",
          "textProteins",
          "proteinContent",
          "nf-line",
          false,
          "roundCarbFiberSugarProtein",
          "",
          "nf-highlight",
          "",
          ""
        );
      }
      if (
        $this.settings.showVitaminD ||
        $this.settings.showCalcium ||
        $this.settings.showIron ||
        $this.settings.showPotassium_2018
      ) {
        nutritionLabel += tab1 + '<div class="nf-bar2"></div>\n';
        nutritionLabel += tab1 + '<div class="nf-vitamins">\n';
      }
      if (
        $this.settings.showVitaminD ||
        $this.settings.showCalcium ||
        $this.settings.showIron ||
        $this.settings.showPotassium_2018
      ) {
        nutritionLabel += tab2 + '<div class="nf-vitamins">\n';
        if ($this.settings.showVitaminD) {
          nutritionLabel +=
            tab3 +
            generateHtmlAndComputeValueGivenThePercentage(
              $this.settings,
              "valueVitaminD",
              "dailyValueVitaminD",
              "unitVitaminD_base",
              "unitVitaminD_percent",
              "naVitaminD",
              "textVitaminD",
              $this.settings.showDailyVitaminD
            );
        }
        if ($this.settings.showCalcium) {
          nutritionLabel +=
            tab3 +
            generateHtmlAndComputeValueGivenThePercentage(
              $this.settings,
              "valueCalcium",
              "dailyValueCalcium",
              "unitCalcium_base",
              "unitCalcium_percent",
              "naCalcium",
              "textCalcium",
              $this.settings.showDailyCalcium
            );
        }
        if ($this.settings.showIron) {
          nutritionLabel +=
            tab3 +
            generateHtmlAndComputeValueGivenThePercentage(
              $this.settings,
              "valueIron",
              "dailyValueIron",
              "unitIron_base",
              "unitIron_percent",
              "naIron",
              "textIron",
              $this.settings.showDailyIron
            );
        }
        if ($this.settings.showPotassium_2018) {
          nutritionLabel +=
            tab3 +
            generateHtmlAndComputeValueGivenThePercentage(
              $this.settings,
              "valuePotassium_2018",
              "dailyValuePotassium_2018",
              "unitPotassium_base",
              "unitPotassium_percent",
              "naPotassium_2018",
              "textPotassium",
              $this.settings.showDailyPotassium_2018
            );
        }
        nutritionLabel += tab2 + "</div>\n";
      }
      if (
        $this.settings.showVitaminD ||
        $this.settings.showCalcium ||
        $this.settings.showIron ||
        $this.settings.showPotassium_2018
      ) {
        nutritionLabel += tab1 + "</div>\n";
      }
      nutritionLabel += tab1 + '<div class="nf-bar1"></div>\n';
      nutritionLabel +=
        tab1 +
        '<div class="' +
        ($this.settings.hidePercentDailyValues
          ? "nf-footnoteHiddenDailyValues"
          : "nf-footnote") +
        '">\n';
      if (!$this.settings.hidePercentDailyValues) {
        nutritionLabel +=
          tab2 +
          '<span tabIndex="0">' +
          $this.settings.textPercentDaily2018VersionPart1;
        nutritionLabel += $this.settings.calorieIntake;
        nutritionLabel +=
          $this.settings.textPercentDaily2018VersionPart2 + "</span>\n";
      }
      if ($this.settings.showIngredients) {
        nutritionLabel += ingredientsHtml2018Version(
          $this.settings,
          tab3,
          tab4
        );
      }
      if ($this.settings.showDisclaimer) {
        nutritionLabel += disclaimerHtml2018Version($this.settings, tab3, tab4);
      }
      nutritionLabel += tab1 + "</div>\n";
      if ($this.settings.showBottomLink) {
        nutritionLabel += bottomLinkHtml2018Version($this.settings, tab1);
      }
      if ($this.settings.showCustomFooter) {
        nutritionLabel +=
          tab1 +
          '<div class="nf-customFooter" tabindex="0">' +
          $this.settings.valueCustomFooter +
          "</div>\n";
      }
      return (nutritionLabel +=
        '<div class="naTooltip">' +
        $this.settings.textDataNotAvailable +
        '</div>\n</div><!-- closing class="nf" -->\n');
    },
    generateUK: function() {
      var $this = this;
      if ($this.nutritionLabel) {
        return $this.nutritionLabel;
      }
      if ($this.settings.hideNotApplicableValues) {
        $this.settings.showCalories = $this.settings.naCalories
          ? false
          : $this.settings.showCalories;
        $this.settings.showTotalFat = $this.settings.naTotalFat
          ? false
          : $this.settings.showTotalFat;
        $this.settings.showSatFat = $this.settings.naSatFat
          ? false
          : $this.settings.showSatFat;
        $this.settings.showTotalCarb = $this.settings.naTotalCarb
          ? false
          : $this.settings.showTotalCarb;
        $this.settings.showSugars = $this.settings.naSugars
          ? false
          : $this.settings.showSugars;
        $this.settings.showFibers = $this.settings.naFibers
          ? false
          : $this.settings.showFibers;
        $this.settings.showProteins = $this.settings.naProteins
          ? false
          : $this.settings.showProteins;
        $this.settings.showCalories = $this.settings.naCalories
          ? false
          : $this.settings.showCalories;
        $this.settings.showSodium = $this.settings.naSodium
          ? false
          : $this.settings.showSodium;
      }
      if ($this.settings.valueServingWeightGrams <= 0) {
        $this.settings.naCalories = true;
        $this.settings.naTotalFat = true;
        $this.settings.naSatFat = true;
        $this.settings.naTotalCarb = true;
        $this.settings.naSugars = true;
        $this.settings.naFibers = true;
        $this.settings.naProteins = true;
        $this.settings.naCalories = true;
        $this.settings.naSodium = true;
      }
      for (x = 1; x < 8; x++) {
        var tab = "";
        for (y = 1; y <= x; y++) {
          tab += "\t";
        }
        eval("var tab" + x + ' = "' + tab + '";');
      }
      var borderCSS = "";
      if ($this.settings.allowNoBorder) {
        borderCSS = "border: 0;";
      }
      var nutritionLabel =
        '<div itemscope itemtype="http://schema.org/NutritionInformation" class="uk_nf uk" style="' +
        borderCSS;
      if (!$this.settings.allowCustomWidth) {
        nutritionLabel += " width: " + $this.settings.width + 'px;">\n';
      } else {
        nutritionLabel += " width: " + $this.settings.widthCustom + ';">\n';
      }
      nutritionLabel +=
        tab1 +
        '<div class="uk_nf-title" tabindex="0">' +
        $this.settings.textNutritionFacts +
        "</div>\n";
      if ($this.settings.showItemNameForUK) {
        nutritionLabel +=
          tab1 +
          '<div class="uk_nf-item-name" tabindex="0">' +
          $this.settings.itemName +
          "</div>\n";
      }
      if (
        $this.settings.convertEmptyServingNametoServingForUKLabel &&
        $this.settings.valueServingSizeUnit + "" === ""
      ) {
        $this.settings.valueServingSizeUnit =
          $this.settings.textUKDefaultServingNameIfEmpty;
      }
      nutritionLabel += tab1 + "<table>\n";
      nutritionLabel += tab2 + "<thead>\n";
      nutritionLabel += tab3 + "<tr>\n";
      nutritionLabel +=
        tab4 + "<th>" + $this.settings.textUKTypicalValues + "</th>\n";
      nutritionLabel +=
        tab4 +
        "<th>" +
        $this.settings.textUKPer100 +
        " 100" +
        $this.settings.unitGramOrMlForThePer100Part +
        "</th>\n";
      nutritionLabel += tab4 + "<th>";
      if ($this.settings.showServingUnitQuantityTextbox) {
        if (!$this.settings.hideTextboxArrows) {
          nutritionLabel += tab5 + '<div class="setter">\n';
          nutritionLabel +=
            tab6 +
            '<a href="' +
            $this.settings.textAriaLabelIncreaseQuantityArrow +
            '" class="uk_nf-unitQuantityUp" ';
          nutritionLabel +=
            'aria-label="' +
            $this.settings.textAriaLabelIncreaseQuantityArrow +
            '" rel="nofollow" tabindex="0"></a>\n';
          nutritionLabel +=
            tab6 +
            '<a href="' +
            $this.settings.textAriaLabelDecreaseQuantityArrow +
            '" class="uk_nf-unitQuantityDown" ';
          nutritionLabel +=
            'aria-label="' +
            $this.settings.textAriaLabelDecreaseQuantityArrow +
            '" rel="nofollow" tabindex="0"></a>\n';
          nutritionLabel += tab5 + '</div><!-- closing class="setter" -->\n\n';
        }
        nutritionLabel +=
          tab5 +
          '<input type="text" data-role="none" value="' +
          parseFloat(
            $this.settings.valueServingUnitQuantity.toFixed(
              this.settings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" ';
        nutritionLabel +=
          'class="uk_nf-unitQuantityBox uk_nf-modifier-field" aria-label="' +
          this.settings.textAriaLabelChangeQuantityTextbox +
          '">\n';
        nutritionLabel +=
          tab5 +
          '<input type="hidden" value="' +
          parseFloat(
            this.settings.valueServingUnitQuantity.toFixed(
              this.settings.decimalPlacesForQuantityTextbox
            )
          ) +
          '" id="uk_nf-nixLabelBeforeQuantity">\n\n';
      } else {
        nutritionLabel += tab5 + $this.settings.valueServingUnitQuantity;
      }
      nutritionLabel +=
        tab5 +
        '<span class="uk_nf-servingUnit">' +
        $this.settings.valueServingSizeUnit;
      nutritionLabel +=
        " (" +
        $this.settings.valueServingWeightGrams.toFixed() +
        $this.settings.unitGramOrMlForThePer100Part +
        ")</span>\n";
      nutritionLabel += "</th>\n";
      nutritionLabel +=
        tab4 +
        "<th>%*(" +
        $this.settings.valueServingWeightGrams.toFixed() +
        $this.settings.unitGramOrMlForThePer100Part +
        ")</th>\n";
      nutritionLabel += tab3 + "</tr>\n";
      nutritionLabel += tab2 + "</thead>\n";
      nutritionLabel += tab1 + "<tbody>\n";
      if ($this.settings.showCalories) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueCalories",
          "",
          "unitEnergy_kj",
          "naCalories",
          "textCalories",
          "",
          "roundToNearestNum",
          "roundToNearestNum",
          false,
          false
        );
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueCalories",
          "dailyValueEnergyKcal",
          "unitEnergy_kcal",
          "naCalories",
          "",
          "",
          "roundToNearestNum",
          "roundToNearestNum",
          $this.settings.showDailyEnergy,
          false
        );
      }
      if ($this.settings.showTotalFat) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueTotalFat",
          "dailyValueTotalFat",
          "unitTotalFat",
          "naTotalFat",
          "textTotalFat",
          "fatContent",
          "roundForUKLabelTotalFatCarbsSugarFiberProtein",
          "roundForUKLabelTotalFatCarbsSugarFiberProteinRule",
          $this.settings.showDailyTotalFat,
          false
        );
      }
      if ($this.settings.showSatFat) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueSatFat",
          "dailyValueSatFat",
          "unitSatFat",
          "naSatFat",
          "textSatFat",
          "saturatedFatContent",
          "roundForUKLabelSatFat",
          "roundForUKLabelSatFatRule",
          $this.settings.showDailySatFat,
          true
        );
      }
      if ($this.settings.showTotalCarb) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueTotalCarb",
          "dailyValueCarb",
          "unitTotalCarb",
          "naTotalCarb",
          "textTotalCarb",
          "carbohydrateContent",
          "roundForUKLabelTotalFatCarbsSugarFiberProtein",
          "roundForUKLabelTotalFatCarbsSugarFiberProteinRule",
          $this.settings.showDailyTotalCarb,
          false
        );
      }
      if ($this.settings.showSugars) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueSugars",
          "dailyValueSugar",
          "unitSugars",
          "naSugars",
          "textSugars",
          "sugarContent",
          "roundForUKLabelTotalFatCarbsSugarFiberProtein",
          "roundForUKLabelTotalFatCarbsSugarFiberProteinRule",
          $this.settings.showDailySugars,
          true
        );
      }
      if ($this.settings.showFibers) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueFibers",
          "",
          "unitFibers",
          "naFibers",
          "textFibers",
          "fiberContent",
          "roundForUKLabelTotalFatCarbsSugarFiberProtein",
          "roundForUKLabelTotalFatCarbsSugarFiberProteinRule",
          false,
          false
        );
      }
      if ($this.settings.showProteins) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueProteins",
          "dailyValueProtein",
          "unitProteins",
          "naProteins",
          "textProteins",
          "proteinContent",
          "roundForUKLabelTotalFatCarbsSugarFiberProtein",
          "roundForUKLabelTotalFatCarbsSugarFiberProteinRule",
          $this.settings.showDailyProtein,
          false
        );
      }
      if ($this.settings.showSodium) {
        nutritionLabel += generateAttributeForUK(
          $this.settings,
          "valueSodium",
          "dailyValueSalt",
          "unitSalt",
          "naSodium",
          "textSodium",
          "sodiumContent",
          "roundForUKLabelSalt",
          "roundForUKLabelSaltRule",
          $this.settings.showDailySodium,
          false
        );
      }
      nutritionLabel += tab2 + "</tbody>\n";
      nutritionLabel += tab2 + "<tfoot>\n";
      nutritionLabel += tab3 + "<tr>\n";
      nutritionLabel += tab4 + '<td colspan="4">\n';
      nutritionLabel += tab5 + '<div class="uk_nf-footnote">\n';
      nutritionLabel += referenceIntakeHtmlUKVersion(
        $this.settings,
        tab6,
        tab7
      );
      if ($this.settings.showIngredients) {
        nutritionLabel += ingredientsHtmlUKVersion($this.settings, tab6, tab7);
      }
      if ($this.settings.showDisclaimer) {
        nutritionLabel += disclaimerHtmlUKVersion($this.settings, tab6, tab7);
      }
      if ($this.settings.showBottomLink) {
        nutritionLabel += bottomLinkHtmlUKVersion($this.settings, tab6);
      }
      if ($this.settings.showCustomFooter) {
        nutritionLabel +=
          tab6 +
          '<div class="uk_nf-customFooter" tabindex="0">\n' +
          tab7 +
          $this.settings.valueCustomFooter +
          "\n" +
          tab6 +
          "</div>\n";
      }
      nutritionLabel += tab5 + "</div>\n";
      nutritionLabel += tab4 + "</td>\n";
      nutritionLabel += tab3 + "</tr>\n";
      nutritionLabel += tab2 + "</tfoot>\n";
      nutritionLabel += tab1 + "</table>\n";
      return (nutritionLabel +=
        '<div class="naTooltip">' +
        $this.settings.textDataNotAvailable +
        '</div>\n</div><!-- closing class="uk_nf" -->\n');
    }
  };
})(jQuery);
