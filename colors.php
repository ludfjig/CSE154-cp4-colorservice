<?php
/*
  Name: Ludvig Liljenberg
  Section: CSE 154 AF
  Date: 05/16/2019

  This file provides back-end support for the color website.
  Based on the input parameters supplied using GET requests,
  the API outputs different details about colors in different formats.

  Web Service details:
  =====================================================================
  Required GET parameters:
  - type
  - mode
  Output formats:
  - Plain text and JSON
  Output Details:
  - If the mode parameter is set to "json", the API
  will output details about the color given in the color parameter as a json object.
  - If the mode parameter is set to "text", details about the color given in the
  color parameter will be returned in plain text format.
  - Else outputs 400 error message as plain text, or if the color parameter is not assigned
  an unrecognizable value.
*/

if (isset($_GET["color"]) && isset($_GET["mode"])) {
  $color = $_GET["color"];
  $mode = $_GET["mode"];
  $result = get_array();

  if ($mode === "json") {
    if ($color === "all" || isset($result[$color])) {
      header("Content-Type: application/json");
      if ($color === "all") {
        print(json_encode($result));
      } else {
        print(json_encode($result[$color]));
      }
    } else {
      header("Content-Type: text/plain");
      print_error("The color {$color} does not exist in my list of colors! " .
        "Please pass a common color name or simply all.");
    }
  } elseif ($mode === "text") {
    header("Content-Type: text/plain");
    if ($color === "all") {
      foreach ($result as $temp_color) {
        print_color_msg($result, $temp_color["name"]);
        print("\n");
      }
    } elseif (isset($result[$color])) {
      print_color_msg($result, $color);
    } else {
      print_error("The color {$color} does not exist in my list of colors! " .
        "Please pass a common color name or simply all.");
    }
  } else {
    header("Content-Type: text/plain");
    print_error("Parameter mode must be either json or text!");
  }
} else {
  header("Content-Type: text/plain");
  print_error("Please include both parameters color and mode in your query!");
}

/**
 * Prints details about the given color in the given results array.
 * @param {array} $result - the array containing all data about all colors.
 * @param {string} $color - What color to print information about.
 */
function print_color_msg($result, $color){
  print($result[$color]["description"]);
  $red = $result[$color]["RGB-values"][0];
  $green = $result[$color]["RGB-values"][1];
  $blue = $result[$color]["RGB-values"][2];
  print("It has RGB-values [{$red}, {$green}, {$blue}]. \n");
}

/**
 * Prints the given error message with an appropriate header.
 * @param {string} $msg - The string that gets output to the user.
 */
function print_error($msg){
  header("HTTP/1.1 400 Invalid Request");
  print($msg);
}

/**
 * function to load all of the color information from the directory structure into
 * one big array.
 * @return {array} - returns the array containing all of the information for all of the colors.
 */
function get_array(){
  $result = array();
  foreach (glob("colors/*") as $filename) {
    $base = basename($filename, ".txt");
    $lines = file("colors/{$base}" . ".txt");
    $desc = $lines[0];
    $blue = (int) $lines[3];
    $red = (int) $lines[1];
    $green = (int) $lines[2];
    $color_values = array(
      $red,
      $green,
      $blue
    );
    $color = array(
      "name" => $base,
      "description" => $desc,
      "RGB-values" => $color_values
    );
    $result[$base] = $color;
  }
  return $result;
}
