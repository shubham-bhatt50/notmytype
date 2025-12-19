"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleFont } from "@/types";
import { searchFonts, filterFontsByCategory, getFontCategories } from "@/lib/fonts";

interface FontSelectorProps {
  label: string;
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  label,
  value,
  onChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fonts, setFonts] = useState<GoogleFont[]>([]);
  const [filteredFonts, setFilteredFonts] = useState<GoogleFont[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = getFontCategories();

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadFonts();
    }
  }, [searchQuery]);

  useEffect(() => {
    let filtered = fonts;
    if (selectedCategory) {
      filtered = filterFontsByCategory(fonts, selectedCategory);
    }
    setFilteredFonts(filtered.slice(0, 20));
  }, [fonts, selectedCategory]);

  const loadFonts = async () => {
    setLoading(true);
    try {
      const allFonts = await searchFonts("");
      setFonts(allFonts);
      setFilteredFonts(allFonts.slice(0, 20));
    } catch (error) {
      console.error("Error loading fonts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchFonts(query);
      setFonts(results);
      setFilteredFonts(results.slice(0, 20));
    } catch (error) {
      console.error("Error searching fonts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (font: GoogleFont) => {
    onChange(font.family);
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true);
        return;
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredFonts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredFonts[selectedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={`Search fonts... (e.g., "Inter", "Roboto")`}
          className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 focus:border-primary-900 focus:ring-2 focus:ring-primary-900/20 transition-all duration-200 placeholder:text-neutral-400 outline-none"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Autocomplete Dropdown */}
        {isOpen && filteredFonts.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-64 overflow-y-auto overscroll-contain"
          >
            {filteredFonts.map((font, index) => (
              <button
                key={font.family}
                onClick={() => handleSelect(font)}
                className={`w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors ${
                  index === selectedIndex ? "bg-neutral-100" : ""
                }`}
              >
                <div
                  className="font-medium"
                  style={{ fontFamily: `"${font.family}", ${font.category}` }}
                >
                  {font.family}
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {font.category}
                </div>
              </button>
            ))}
          </div>
        )}

        {isOpen && !loading && filteredFonts.length === 0 && searchQuery && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-4 text-center text-sm text-neutral-500">
            No fonts found
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary-900 text-white"
              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === category
                ? "bg-primary-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Current Selection */}
      {value && (
        <div className="pt-2 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 mb-1">Selected</p>
          <p
            className="text-sm font-medium"
            style={{ fontFamily: `"${value}", sans-serif` }}
          >
            {value}
          </p>
        </div>
      )}
    </div>
  );
};

